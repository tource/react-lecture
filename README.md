# Redux Toolkit TS

## 1. index.js 를 index.tsx 로 변경

```tsx
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import RTKSample from "./RTKSample";
import "./index.css";
import store from "./store";

// const root = ReactDOM.createRoot(document.getElementById("root"));
const rootDiv = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootDiv);

// Redux Toolkit 저장소 공급
root.render(
  <Provider store={store}>
    <RTKSample />
  </Provider>,
);
```

## 2. slice 들을 ts 로 변경

```ts
import { createSlice } from "@reduxjs/toolkit";

// any 는 데이터 타입이 불명확하다고 자꾸 오류로 인식
// any 오류는 ESLint 에서 잡는다.
interface ActionState {
  payload: any;
  type: string;
}

interface LoginState {
  email?: string;
  userName?: string;
  userLevel?: number;
}
const initialState: LoginState = {
  email: "",
  userName: "",
  userLevel: 0,
};
const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initialState,
  reducers: {
    login: (state: LoginState, action: ActionState): LoginState => {
      return { ...state, ...action.payload };
    },
    logout: (): LoginState => {
      return { ...initialState };
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
```

```ts
import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  theme: string;
}
const initialState: ThemeState = {
  theme: "black",
};
const themeSlice = createSlice({
  name: "themeSlice",
  initialState: initialState,
  // 상태 정보를 CRUD 하는 함수작성
  reducers: {
    changeBlack: (): void => {
      console.log("change  Black.....");
    },
    changeWhite: (): void => {
      console.log("change  White.....");
    },
    changeRed: (): ThemeState => {
      return { theme: "red" };
    },
  },
});

export const { changeBlack, changeWhite, changeRed } = themeSlice.actions;
export default themeSlice.reducer;
```

```ts
import { createSlice } from "@reduxjs/toolkit";

interface ActionState {
  payload: any;
  type: string;
}

interface LangState {
  word: string;
}
const initialState: LangState = {
  word: "안녕하세요",
};
const langSlice = createSlice({
  name: "langSlice",
  initialState: initialState,
  reducers: {
    changeKor: (): LangState => {
      return { ...initialState };
    },
    changeEng: (): LangState => {
      return { word: "Hello" };
    },
    changeEtc: (state: LangState, action: ActionState): LangState => {
      return { ...state, ...action.payload };
    },
  },
});

export const { changeKor, changeEng, changeEtc } = langSlice.actions;
export default langSlice.reducer;
```

## 3. /src/store.js 를 store.ts 로 변경

```ts
import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import themeSlice from "./slices/themeSlice";
import langSlice from "./slices/langSlice";

const store = configureStore({
  reducer: {
    loginSlice,
    themeSlice,
    langSlice,
  },
});

// 현재 interfce 만 기초이해함. 추후 type 으로도 데이터 형태를 정의할 수있다.
// interface 와 type 의 기능이 같습니다.
// 하지만, 많은 분들이 interface 를 사용합니다.
// type 에 의한 데이터 모양 만들기 보다 훨씬 interafce 가 응용력 높음

// useSelector 에 타입
export type RootState = ReturnType<typeof store.getState>;
// useDispatch 에 타입
export type AppDispatch = typeof store.dispatch;

export default store;
```

## 4. /src/RTKSample.js 를 RTKSample.tsx 로 변경

```tsx
import React from "react";
import Menu from "./components/Menu";
import { useDispatch, useSelector } from "react-redux";
import { changeEng, changeEtc, changeKor } from "./slices/langSlice";
import { AppDispatch, RootState } from "./store";

const RTKSample: React.FC = () => {
  // slice 정보 가져오기
  const themeState = useSelector((state: RootState) => state.themeSlice);
  const langState = useSelector((state: RootState) => state.langSlice);
  const dispatch = useDispatch<AppDispatch>();
  const handleClickKR = () => {
    dispatch(changeKor());
  };
  const handleClickEN = () => {
    dispatch(changeEng());
  };
  const handleClickETC = () => {
    dispatch(changeEtc({ word: "울라불라 쉬었다 갈게요." }));
  };

  return (
    <div>
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

## 5. /src/components/Menu.js 를 Menu.tsx 로 변경

```tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../slices/loginSlice";
import { changeRed } from "../slices/themeSlice";
import { AppDispatch, RootState } from "../store";
const Menu: React.FC = () => {
  // slice 정보 출력하기
  // useSelector 는 slice의 정보를 가져온다.
  const loginState = useSelector((state: RootState) => state.loginSlice);
  // console.log(loginState);
  // 로그인 하기 (action 실행)
  const dispatch = useDispatch<AppDispatch>();
  const handleClickLogin = () => {
    // slice 의 action 을 실행시
    const data = { email: "aaa@aaa.net", userName: "홍길동", userLevel: 10 };
    dispatch(login(data));
  };
  const handleClickLogout = () => {
    // slice 의 action 을 실행시
    dispatch(logout());
  };
  const handelClickTheme = () => {
    dispatch(changeRed());
  };

  return (
    <div>
      <button
        onClick={() => {
          handelClickTheme();
        }}
      >
        테마바꾸기
      </button>
      <ul>
        {loginState.email ? (
          //로그인 하고 난 후 정보 출력
          <li>
            <div>이메일 : {loginState.email}</div>
            <div>유저이름 : {loginState.userName} </div>
            <div>유저레벨 : {loginState.userLevel} </div>
            <button
              onClick={() => {
                handleClickLogout();
              }}
            >
              로그아웃
            </button>
          </li>
        ) : (
          // 로그인 하기 전
          <li>
            <div>로그인을 해주세요.</div>
            <button
              onClick={() => {
                handleClickLogin();
              }}
            >
              로그인
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
```
