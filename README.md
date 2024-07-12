# React Toolkit TS 적용

## 1. 파일명 변경

- index.js ===> index.tsx

```tsx
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import RTKSample from "./RTKSample";
import "./index.css";
import store from "./store";

const root = ReactDOM.createRoot(
  // as 는 내가 책임질께 VSCode 타입추론 하지마.
  document.getElementById("root") as HTMLElement,
);

// Redux Toolkit 저장소 공급
root.render(
  <Provider store={store}>
    <RTKSample />
  </Provider>,
);
```

- store.js ===> store.ts

```ts
import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import themeSlice from "./slices/themeSlice";
import langSlice from "./slices/langSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    loginSlice,
    themeSlice,
    langSlice,
    userSlice,
  },
});
// state 를 외부 에서 참조하도록
export type RootState = ReturnType<typeof store.getState>;
// dispatch 외부에서 실행하도록
export type AppDispatch = typeof store.dispatch;
// 기본 내보내기
export default store;
```

- userSlice.js ===> index.ts

```ts
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import RTKSample from "./RTKSample";
import "./index.css";
import store from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

// Redux Toolkit 저장소 공급
root.render(
  <Provider store={store}>
    <RTKSample />
  </Provider>,
);

```

- RTKSample.js ===> RTKSample.tsx

```tsx
import React from "react";
import Menu from "./components/Menu";
import { useDispatch, useSelector } from "react-redux";
import { changeEng, changeEtc, changeKor } from "./slices/langSlice";
import {
  getUserAsyncThunk,
  postLoginAsyncThunk,
  showUser,
  userlogin,
} from "./slices/userSlice";
import { postLogin } from "./apis/memberapi/memberapi";
import { AppDispatch, RootState } from "./store";

const RTKSample: React.FC = () => {
  // slice 정보 가져오기
  const themeState = useSelector((state: RootState) => state.themeSlice);
  //console.log(themeState); // {theme:"black"}
  // const colorObj = {
  //   color: themeState.theme,
  // };
  const langState = useSelector((state: RootState) => state.langSlice);
  const dispatch = useDispatch<AppDispatch>();
  // store에서 정의한 action 즉, RootState 업데이트 함수
  const handleClickKR = () => {
    dispatch(changeKor());
  };
  const handleClickEN = () => {
    dispatch(changeEng());
  };
  const handleClickETC = () => {
    dispatch(changeEtc({ word: "울라불라 쉬었다 갈게요." }));
  };

  // 사용자 정보
  const userState = useSelector((state: RootState) => state.userSlice);
  console.log("사용자 정보 : ", userState);
  // 정보 호출
  const handleClickUser = async () => {
    // 일반적 reducer 함수 호출
    // dispatch(showUser());
    // 비동기 extraReducer 호출
    dispatch(getUserAsyncThunk());
    // dispatch(postLoginAsyncThunk());
    // const result = await postLogin();
    // dispatch(userlogin(result));
  };

  return (
    <div>
      <div>
        <button
          onClick={() => {
            handleClickUser();
          }}
        >
          사용자 정보 비동기 호출
        </button>
      </div>

      {userState.id ? (
        <div>
          {userState.id}
          {userState.userId}
          {userState.title}
          {userState.completed}
        </div>
      ) : (
        <div>사용자정보가 없어요.</div>
      )}

      <button
        onClick={() => {
          handleClickKR();
        }}
      >
        한국어
      </button>
      <button
        onClick={() => {
          handleClickEN();
        }}
      >
        영어
      </button>
      <button
        onClick={() => {
          handleClickETC();
        }}
      >
        기타
      </button>
      <h1 style={{ color: themeState.theme }}> {langState.word} RTK 샘플</h1>
      <Menu />
    </div>
  );
};

export default RTKSample;
```
