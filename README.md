# JWT 와 Redux toolkit 연동

## 1. redux toolkit 환경 설정 확인

- redux 및 redux-toolkit 설치 확인
  : npm install @reduxjs/toolkit
  : npm install redux
  : npm i react-redux

- /src/store 폴더 있는가?
- /src/store/store.js 파일
- /src/index.js 확인
- /src/slices 폴더 생성
- /src/slices/loginSlice.js 생성

```js
import { createSlice } from "@reduxjs/toolkit";

// 1. 초기값
const initialState = {
  email: "",
  name: "",
  token: "",
};

// 2. slice 만들기
const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      return { ...state, ...action.payload };
    },
    userModify: (state, action) => {
      return { ...state, ...action.payload };
    },
    logout: (state, action) => {
      return { ...initialState };
    },
  },
});

export const { login, userModify, logout } = loginSlice.actions;
export default loginSlice.reducer;
```

- 저장하기

````js
 // dispatch 를 이용해서 전역변수 쓰기
    dispatch(login({ email: "", token: res.data.accessToken }));
    ```
````

- 읽기

```js
const beforeReq = config => {
  //let accessToken = getCookie("accessToken");
  const userInfo = useSelector(state => state.loginSlice);

  if (!userInfo.token) {
    return Promise.reject({
      response: { data: { error: "Login 하셔서 인증받으세요." } },
    });
  }
  config.headers.Authorization = `Bearer ${userInfo.token}`;
  return config;
};
```
