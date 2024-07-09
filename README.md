# 백엔드 연동

- accessToken 만 존재
- 로그인시 accessToken 을 줌
- cookie 에 accessToken 을 보관해 둠
- `/api/auth/access-token`
  : 위의 API 가 accessToken 을 오류 발생시 발급해 줌
  : GET 방식

## 1. 적용 단계

### 1.1. 로그인을 통해서 accessToken 을 정상적으로 발급 받아 저장해둠.

- 일반 axios

```js
const postLogin = async () => {
  const res = await axios.post("/api/auth/sign-in", {
    userEmail: "email@email.com",
    userPw: "p!ssw!rd",
  });
  // 로그인에 성공하면 accesstoken 을 받을 수 있다.
  console.log(res.data);
  // 아래처럼 쿠키로 저장해둔다.
  setCookie("accessToken", res.data.accessToken);
};
```

- jwtAxios 활용(사용자 정보 호출)

```js
// jwt 인증을 이용한 정보 알아내기
const getUserInfo = async () => {
  const res = await jwtAxios.get("/api/user");
  console.log(res.data);
};
```

```js
import axios from "axios";
import { getCookie, setCookie } from "../utils/cookie";

const jwtAxios = axios.create();
// Request Intercepter
// Access Token 활용하기
const beforeReq = config => {
  let accessToken = getCookie("accessToken");
  if (!accessToken) {
    return Promise.reject({
      response: { data: { error: "Login 하셔서 인증받으세요." } },
    });
  }
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

const failReq = err => {
  console.log("요청 후... 실패", err);
  return Promise.reject(err);
};

// axios의 intercepter 적용
jwtAxios.interceptors.request.use(beforeReq, failReq);

// Reponse
const beforeRes = async res => {
  const respose = await axios.get("/api/auth/access-token");
  setCookie("accessToken", respose.data.accessToken);
  return respose.config;
};
const responseFail = async err => {
  const res = await axios.get("/api/auth/access-token");
  setCookie("accessToken", res.data.accessToken);
  return err.config;
};

// axios의 intercepter 적용
jwtAxios.interceptors.response.use(beforeRes, responseFail);
export default jwtAxios;
```
