# JWT (Javascript Web Token)

- 많은 회사에서 JWT 를 사용합니다.
- 그런데, 꼭 JWT 를 하는 것이 아닙니다.
- Token : 아주 길고 복잡한 문자열을 말합니다.

## 1. JWT 토큰의 종류(2가지)

### 1.1. Access 토큰

- API 요청(axios)시 요청내용에 Token을 포함해서 전송
- JWT 인증을 적용한 곳에서는 Access Token 이 없으면 결과를 리턴하지 않음
- JWT 인증을 적용한 곳에서는 Access Token 이 필수 항목
- 모든 API 에 Access Token 을 필요한 것은 아닙니다.

### 1.2. Refresh 토큰

- BE 에서 발급한 Access Token 은 만료 시간이 존재합니다.
- 기본 만료시간이 30분이고, BE 팀에 따라서 만료 시간을 변경합니다.
- 만약, 시간이 만료된 Access Token 으로 자료요청시 BE 에서 새로운 Token 만들어줍니다.
- 새로 만들어진 Token 을 Refresh Token 이라고 합니다.
- BE 에서는 Refresh Token 이 전달되면 새로운 Access Token 을 만들어서 리턴합니다.
- FE 에서는 새로 만들어진 Access Token 으로 다시 자료를 요청합니다.

## 2. axios 에 JWT 적용하기

- /src/apis/jwtUtil.js
  : axios 는 2가지로 구분해서 생성을 권장함
  : 일반 axios
  `axios.get()`
  `axios.post()`
  : accessToken 포함 axios
  `jwtAxios.get()`
  `jwtAxios.post()`

### 2.1. accessToken 을 포함한 axios 생성

`const jwtAxios = axios.create();`

### 2.2. Request 즉, 자료를 요청하는 경우

: 2가지 경우의 함수를 만들자.

- Request 전에 `포함할 내용을 가진` 함수

```js
const beforeReq = config => {
  console.log("요청 전... 전달", config);
  return config;
};
```

- Request 시에 `에러가 리턴되는 결과를 처리할` 함수

```js
const failReq = err => {
  console.log("요청 후... 실패", err);
  return Promise.reject(err);
};
```

### 2.3. Response 즉, 리턴 결과를 처리하는 경우

- 정상적인 `처리가 되고 결과를 처리`하는 함수

```js
const beforeRes = res => {
  console.log("요청 Response 전처리", res);
  return res;
};
```

- 리턴되는 `결과가 에러인 경우 처리`하는 함수

```js
const responseFail = err => {
  console.log("요청 Response 에러일 때", err);
  return Promise.reject(err);
};
```

### 2.4. intercepter 적용하기

```js
// axios의 intercepter 적용
jwtAxios.interceptors.request.use(beforeReq, failReq);
jwtAxios.interceptors.response.use(beforeRes, responseFail);
```

### 2.5. 테스트 하면서 결과보기

- /src/AppJWT.jsx
