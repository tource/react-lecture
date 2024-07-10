# Redux Toolkit

- 전역 상태 (state) 관리 도구 중 가장 많이 사용
- 전역 상태가 변화면 앱 전체가 리랜더링
- 컴포넌트 리랜더링(useState)
- 전역 상태 리랜더링은 (index.js, App.js)
- https://ko.redux.js.org/introduction/getting-started

# 설치

- `npm install @reduxjs/toolkit`
- `npm install redux`
- `npm i react-redux`

# Redux 학습 순서는 아래를 기준으로 함.

- 무조건 샘플 코드의 순서로 진행.
- 폴더 규칙도 순서대로 진행.

## 1. /src/store.js 를 생성한다.

: 일반적으로 회사에서는 /src/store 폴더를 만드는 경우가 많습니다.

```js
import { configureStore } from "@reduxjs/toolkit";
// reducer 를 철자를 조심하세요.
export default configureStore({ reducer: {} });
```

## 2. /src/index.js 수정

: App.js 에 코드하는 것도 권장

```js
import ReactDOM from "react-dom/client";
import "./index.css";
import AppTodoTs from "./AppTodoTs";
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Redux Toolkit 저장소 공급
root.render(
  <Provider store={store}>
    <AppTodoTs />
  </Provider>,
);
```

## 3. /src/slices 폴더 생성

: 각각의 보관을 할 정보를 기준으로 slice 파일들을 생성해 줍니다.
: slice 는 한개의 store를 나누어서 활용한다는 개념.
: 업무 영역 분할이 가능하다.
: 회사에서는 /src/reducers 폴더를 만들거나 /src/slices 폴더를 생성하기도 합니다.
: 샘플로 로그인 기능, 테마기능

### 3.1. /src/slices/loginSlice.js

```js
import { createSlice } from "@reduxjs/toolkit";

// 1. 초기값 셋팅
const initialState = {
  email: "",
  userName: "",
  userLevel: 0,
};
const loginSlice = createSlice({
  // name 은 slice 구분하기 위한용도
  // 관례상 파일명을 작성한다.
  name: "loginSlice",
  // 초기값
  initialState: initialState,
  // 상태 정보를 CRUD 하는 함수작성
  // 아래의 철자를 주의합니다. reducers
  // 복수형입니다.
  reducers: {
    login: () => {
      console.log("Login.....");
    },
    logout: () => {
      console.log("LogOut!!!!");
    },
  },
});

// store의 loginSlice 의 저장값을 갱신, 출력 용도
// 철자를 주의합니다. actions 복수형
export const { login, logout } = loginSlice.actions;
// loginSlice 의 기본을 내보낸다.
// 상당히 주의하셔야 해요.
// 철자를 주의합니다. reducer
export default loginSlice.reducer;
```

### 3.2. /src/slices/themeSlice.js

```js
import { createSlice } from "@reduxjs/toolkit";

// 1. 초기값 셋팅
const initialState = {
  theme: "black",
};
const themeSlice = createSlice({
  name: "themeSlice",
  initialState: initialState,
  // 상태 정보를 CRUD 하는 함수작성
  reducers: {
    changeBlack: () => {
      console.log("change  Black.....");
    },
    changeWhite: () => {
      console.log("change  White.....");
    },
  },
});

export const { changeBlack, changeWhite } = themeSlice.actions;
export default themeSlice.reducer;
```

### 3.3. /src/slices/langSlice.js

: 개인적 작업을 작업

## 4. slice 들을 store 의 reducer 에 등록

```js
import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import themeSlice from "./slices/themeSlice";
export default configureStore({
  // 철자를 주의합니다. reducer
  reducer: {
    loginSlice,
    themeSlice,
  },
});
```

## 5. loginSlice 읽고, 쓰기 샘플

- `/src/RTKSample.js` 생성

```js
import React from "react";
import Menu from "./components/Menu";

const RTKSample = () => {
  return (
    <div>
      <h1>RTK 샘플</h1>
      <Menu />
    </div>
  );
};

export default RTKSample;
```

- `/src/components/Menu.js` 생성

```js
import React from "react";

const Menu = () => {
  return <div>메뉴</div>;
};

export default Menu;
```

- `/src/index.js` 수정

```js
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import RTKSample from "./RTKSample";
import "./index.css";
import store from "./store";
const root = ReactDOM.createRoot(document.getElementById("root"));

// Redux Toolkit 저장소 공급
root.render(
  <Provider store={store}>
    <RTKSample />
  </Provider>,
);
```

### 5.1. Menu.js 에 loginSlice 적용하기

```js
import React from "react";

const Menu = () => {
  return (
    <div>
      <ul>
        {/* 로그인 하기 전 */}
        <li>
          <div>로그인을 해주세요.</div>
          <button>로그인</button>
        </li>

        {/* 로그인 하고 난 후 정보 출력 */}
        <li>
          <div>이메일 : </div>
          <div>유저이름 : </div>
          <div>유저레벨 : </div>
          <button>로그아웃</button>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
```

### 5.2. Menu.js 에 loginSlice 정보 출력하기

- loginSlice 에 보관한 정보를 출력하기
  : slice에 보관한 정보를 출력시 useSelector( state => state.loginSlice )
  : 만약 themeSlice 출력시는 useSelector( state => state.themeSlice )
  : 만약 langSlice 출력시는 useSelector( state => state.langSlice )

```js
import React from "react";
import { useSelector } from "react-redux";
const Menu = () => {
  // slice 정보 출력하기
  // useSelector 는 slice의 정보를 가져온다.
  const loginState = useSelector(state => state.loginSlice);
  console.log(loginState);

  return (
    <div>
      <ul>
        {loginState.email ? (
          //로그인 하고 난 후 정보 출력
          <li>
            <div>이메일 : {loginState.email}</div>
            <div>유저이름 : {loginState.userName} </div>
            <div>유저레벨 : {loginState.useLevel} </div>
            <button>로그아웃</button>
          </li>
        ) : (
          // 로그인 하기 전
          <li>
            <div>로그인을 해주세요.</div>
            <button>로그인</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
```

### 5.3. Menu.js 에 loginSlice 업데이트(action 실행하기)

- loginSlice 에 정보를 업데이트시
  : useDispatch 를 활용.
  : loginSlice에는 action 이 login, logout 이 있다.

```js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../slices/loginSlice";
const Menu = () => {
  // slice 정보 출력하기
  // useSelector 는 slice의 정보를 가져온다.
  const loginState = useSelector(state => state.loginSlice);
  console.log(loginState);
  // 로그인 하기 (action 실행)
  const dispatch = useDispatch();
  const handleClickLogin = () => {
    // slice 의 action 을 실행시
    dispatch(login());
  };
  const handleClickLogout = () => {
    // slice 의 action 을 실행시
    dispatch(logout());
  };

  return (
    <div>
      <ul>
        {loginState.email ? (
          //로그인 하고 난 후 정보 출력
          <li>
            <div>이메일 : {loginState.email}</div>
            <div>유저이름 : {loginState.userName} </div>
            <div>유저레벨 : {loginState.useLevel} </div>
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

- loginSlice 에 정보를 전달해서 업데이트하기

```js
import { createSlice } from "@reduxjs/toolkit";

// 1. 초기값 셋팅
const initialState = {
  email: "",
  userName: "",
  userLevel: 0,
};
const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initialState,
  // 상태 정보를 CRUD 하는 함수작성
  reducers: {
    // 무조건 매개변수는 2개가 들어갑니다.
    // 첫번째 매개변수는 state 즉, 관리 중인 데이터
    // 두번째 매개변수는 action 즉, 업데이트 할 데이터
    // action 은 type 과 payload 가 있다.
    login: (state, action) => {
      // action 은 payload 가 있습니다.
      // console.log("state : ", state);
      // console.log("action : ", action);
      // console.log("Login.....");
      return { ...state, ...action.payload };
    },
    logout: () => {
      // console.log("LogOut!!!!");
      return { ...initialState };
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
```

```js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../slices/loginSlice";
const Menu = () => {
  // slice 정보 출력하기
  // useSelector 는 slice의 정보를 가져온다.
  const loginState = useSelector(state => state.loginSlice);
  console.log(loginState);
  // 로그인 하기 (action 실행)
  const dispatch = useDispatch();
  const handleClickLogin = () => {
    // slice 의 action 을 실행시
    const data = { email: "aaa@aaa.net", userName: "홍길동", userLevel: 10 };
    dispatch(login(data));
  };
  const handleClickLogout = () => {
    // slice 의 action 을 실행시
    dispatch(logout());
  };

  return (
    <div>
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

## 6. themeSlice 활용해 보기

- /src/RTKSample.js

```js
import React from "react";
import Menu from "./components/Menu";
import { useSelector } from "react-redux";

const RTKSample = () => {
  // slice 정보 가져오기
  const themeState = useSelector(state => state.themeSlice);
  //console.log(themeState); // {theme:"black"}
  // const colorObj = {
  //   color: themeState.theme,
  // };
  return (
    <div>
      <h1 style={{ color: themeState.theme }}>RTK 샘플</h1>
      <Menu />
    </div>
  );
};

export default RTKSample;
```

- /src/components/Menu.js

```js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../slices/loginSlice";
import { changeRed } from "../slices/themeSlice";
const Menu = () => {
  // slice 정보 출력하기
  // useSelector 는 slice의 정보를 가져온다.
  const loginState = useSelector(state => state.loginSlice);
  // console.log(loginState);
  // 로그인 하기 (action 실행)
  const dispatch = useDispatch();
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

## 7. langSlice 활용해 보기

### 7.1. slice 생성

- /src/slices/langSlice.js

```js
import { createSlice } from "@reduxjs/toolkit";
import { changeBlack } from "./themeSlice";

const initialState = {
  word: "안녕하세요",
};
const langSlice = createSlice({
  name: "langSlice",
  initialState: initialState,
  reducers: {
    changeKor: (state, action) => {
      return { ...initialState };
    },
    changeEng: (state, action) => {
      return { word: "Hello" };
    },
    changeEtc: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { changeKor, changeEng, changeEtc } = langSlice.actions;
export default langSlice.reducer;
```

### 7.2. slice를 sotre에 등록

- /src/store.js

```js
import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import themeSlice from "./slices/themeSlice";
import langSlice from "./slices/langSlice";
export default configureStore({
  reducer: {
    loginSlice,
    themeSlice,
    langSlice,
  },
});
```

### 7.3. slice를 useSelector 와 useDispatch 를 활용

- /src/RTKSample.js

```js
import React from "react";
import Menu from "./components/Menu";
import { useDispatch, useSelector } from "react-redux";
import { changeEng, changeEtc, changeKor } from "./slices/langSlice";

const RTKSample = () => {
  // slice 정보 가져오기
  const themeState = useSelector(state => state.themeSlice);
  //console.log(themeState); // {theme:"black"}
  // const colorObj = {
  //   color: themeState.theme,
  // };
  const langState = useSelector(state => state.langSlice);
  const dispatch = useDispatch();
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
