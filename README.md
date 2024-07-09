# JWT 적용

- axios 적용 방식은 2가지가 있다.
  : jwt 없이 일반적 axios 적용
  : jwt 이용한 방식

## 1. axios 일반 방식

- swagger 에서 테스트시 Network 탭에 상세 항목확인
  : Headers 항목에 Authorization 없음
- 상식적으로 accessToken 이 없으면 항목을 못본다?
  : 상황이 맞지 않습니다.
- 상식적으로 로그인을 진행시 accessToken 없다.
  : 로그인 성공시 BE 에서 accessToken 을 발급해 줌.
  : accessToken 을 보관한다.
  : 보관장소로는 cookie, localStorage, sessionStorage 에 보관한다.
  : 일반적으로 로그인 시 Response 로 2가지 형식 중 리턴됨
  : accessToken 만 주어지는 경우
  ```json
  {
    "code": "SU",
    "message": "Success",
    "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MjA0ODY5MTgsImV4cCI6MTcyMDQ4ODcxOCwic2lnbmVkVXNlciI6IntcInVzZXJJZFwiOjEyLFwicm9sZVwiOlwiUk9MRV9VU0VSXCJ9In0.aIBFGlBjVO_c5DAwSJbKQYZvWentDfitTq7DBEYW-BlXtvPvAc6VFFmkU5GQl-Abxm3pyWsledHQS-SwaaIftA"
  }
  ```
  : accessToken 과 accessToken 갱신용 refreshToken 이 같이 오는 경우
  ```json
  {
    "code": "SU",
    "message": "Success",
    "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MjA0ODY5MTgsImV4cCI6MTcyMDQ4ODcxOCwic2lnbmVkVXNlciI6IntcInVzZXJJZFwiOjEyLFwicm9sZVwiOlwiUk9MRV9VU0VSXCJ9In0.aIBFGlBjVO_c5DAwSJbKQYZvWentDfitTq7DBEYW-BlXtvPvAc6VFFmkU5GQl-Abxm3pyWsledHQS-SwaaIftA",
    "refreshToken" : "SDFSFSDFSDFSFSDF........
  }
  ```
- accessToken 과 refreshToken 은 cookie 에 저장해 둔다.
- 인증이 필요로 한 api 에는 추가해서 전달해야 결과가 나온다.

## 2. axios 에 accessToken 추가하여 호출하기

- 추천 : jwt 인증 전용 axios 인스턴스를 만들어서 사용하기를 권장
- `/src/apis/jwtUtil.js` 생성

```js
// axios 인스턴스 생성하기
const jwtAxios = axios.create();
```

- 요청(Request) 하기전 처리
  : 요청시 자동으로 accessToken 내용을 headers 첨부
  : confing 매개변수는 현재 전달한 axios 내용이 작성되어있음.
  : cookie 확인하고 header 에 Authorization 내용 추가하기

  ```js
  const beforeReq = config => {
    console.log("1. 요청전 호출한 모든내용 보관", config);
    const accessToken = getCookie("accessToken");
    console.log("2. 쿠키로 토큰 가져오기 ", accessToken);

    if (!accessToken) {
      console.log("쿠키정보가 없습니다.!!!!!!!!");
      console.log("호출 중인 axios 를 중단합니다.");
      console.log("axios 중단하면서 원하는 메시지를 작성해 줍니다.");
      return Promise.reject({
        response: { data: { error: "Login 하셔서 인증받으세요." } },
      });
    }
    console.log("4. AccessToken을 axios 의 headers 에 추가한다.");
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  };
  ```

  : 에러처리

  ```js
  const failReq = err => {
    console.log("요청 후... 실패", err);
    return Promise.reject(err);
  };
  ```

  : axios 에 성공과 실패에 대한 Request 용 intercepter 에 등록한다.

  ```js
  // axios의 intercepter 적용
  jwtAxios.interceptors.request.use(beforeReq, failReq);
  ```

- 결과(Response) 후 처리
  : accessToken 을 이용해서 인증요청한 부분은 통과됨.
  : BE 에서 돌아오는 메세지가 2가지인 경우로 생각해봄

### 2.1. accessToken 이 인증이 실패한 경우

- 먼저 2가지 경우로 함수를 만든다.
- Response 의 결과를 먼처 처리해 본다.

```js
const beforeRes = async res => {
  console.log("1. 요청 Response 전처리", res);
  const data = res.data;
  console.log("2. Response 오기전 서버 전달해 준 데이터", data);

  // 여기서 부터 테스트 필요로 함.
  if (data && data.error === "ERROR_ACCESS_TOKEN") {
    console.log("3. 일반적인 오류가 아닌 액세스 토큰 오류다.");
    console.log("4. 액세스 토큰 오류이므로 새로운 토큰을 요청한다.");
    console.log("5. 쿠키에 담겨진 Refresh Token 을 읽어들인다.");
    const accessToken = getCookie("accessToken");
    const reFreshToken = getCookie("refresh-token");
    console.log(
      "6. Refresh Token 을 이용해서 새로운 토큰을 요청한다. ",
      reFreshToken,
    );

    console.log("7. 새로운 access Token 생성 요청. ");
    // 새로운 토큰을 요청하는 함수 실행
    const result = await refereshJWT(accessToken, reFreshToken);

    console.log("8. 새로운 토큰으로 쿠키를 업데이트한다. ");
    console.log(
      "9. 이전에 요청했던 axios 를 새로운 토큰을 담아서 다시 호출한다. ",
    );
  }

  return res;
};
```

- Response 의 결과가 오류인 경우 처리해 본다.

```js
const responseFail = err => {
  console.log("요청 Response 에러일 때", err);
  return Promise.reject(err);
};
```

- axios의 Response intercepter 적용

```js
jwtAxios.interceptors.response.use(beforeRes, responseFail);
```

### 2.2 정상적인 처리가 된 경우
