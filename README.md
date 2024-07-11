# Redux Toolkit 비동기 서버 연동

- 상식
  : Redux 하위 버전에서는 비동기 서버 연동을 위한 라이브러리 별도제공
  : Redux Thunk(리덕스 썽크), Redux Saga 등
  : 현재 Redux Toolkit 에서는 createAsyncThunk 를 활용
- 의도
  : 상태관리 도구인 Redux Tookit 에서 서버연동 데이터도 같이 상태관리하겠다.

## 1. 백엔드 연동 API

- `/src/apis/memberapi` 폴더 생성
- memberapi.js 파일 생성

```js
import axios from "axios";

export const postLogin = async () => {
  try {
    const res = await axios.post("주소", {});
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
```

## 2. userSlice 생성하기

- /src/slices/userSlice.js

```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: 0,
  id: 0,
  title: "",
  completed: false,
};
const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    showUser: (state, actions) => {
      console.log("정보를 보여줘");
    },
  },
});
export const { showUser } = userSlice.actions;
export default userSlice.reducer;
```

## 3. store 에 slice 등록

```js
import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import themeSlice from "./slices/themeSlice";
import langSlice from "./slices/langSlice";
import userSlice from "./slices/userSlice";
export default configureStore({
  reducer: {
    loginSlice,
    themeSlice,
    langSlice,
    userSlice,
  },
});
```

## 4. useSlector 와 useDispatch 활용

- /src/RTKSample.js

```js
import React from "react";
import Menu from "./components/Menu";
import { useDispatch, useSelector } from "react-redux";
import { changeEng, changeEtc, changeKor } from "./slices/langSlice";
import { showUser } from "./slices/userSlice";

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

  // 사용자 정보
  const userState = useSelector(state => state.userSlice);
  console.log(userState);
  // 정보 호출
  const handleClickUser = () => {
    dispatch(showUser());
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
          {userState.complted}
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

## 5. 비동기 서버 API 활용
