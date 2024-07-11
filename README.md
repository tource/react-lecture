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
    const res = await axios.post("/api/auth/sign-in", {
      userEmail: "mybirth811@gmail.com",
      userPw: "Tngus811!",
    });
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
  // 실시간 즉, 동기적으로 데이터 갱신
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

- userSlice 업데이트

```js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, postLogin } from "../apis/memberapi/memberapi";
import axios from "axios";
// 규칙을 준수하시고 나중에 응용하세요.
// 1 단계. AsyncThunk 객체를 만든다.
//  예) postLogin ===> const postLoginAsyncThunk
export const getUserAsyncThunk = createAsyncThunk(
  "getUserAsyncThunk",
  async () => {
    try {
      // API 호출
      const res = await getUser();
      // API 호출 시 전달 된 Response 결과를 return 해준다.
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);

// 실제 서버 테스트
export const postLoginAsyncThunk = createAsyncThunk(
  "postLoginAsyncThunk",
  async () => {
    try {
      const res = await postLogin();
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);

const initialState = {
  userId: 0,
  id: 0,
  title: "",
  completed: false,
};
const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  // 앱에서 상태 업데이트 하기
  reducers: {
    showUser: (state, action) => {
      console.log("정보를 보여줘");
    },
  },
  // 2단계 비동기로 API 서버 연동
  // builder 는 단어를 고치지 말자.
  extraReducers: builder => {
    // fulfilled : 결과가 성공적으로 처리된 경우 처리
    builder.addCase(getUserAsyncThunk.fulfilled, (state, action) => {
      // 성공시 처리
      console.log("getUserAsyncThunk.fulfilled");
      console.log("getUserAsyncThunk.fulfilled action", action);
      const payload = action.payload;
      return { ...state, ...payload };
    });
    // rejected : 결과가 오류로 처리된 경우 처리
    builder.addCase(getUserAsyncThunk.rejected, (state, action) => {
      // 오류시 처리
      console.log("getUserAsyncThunk.rejected");
    });
    // pending: 접속 진행 중입니다.
    builder.addCase(getUserAsyncThunk.pending, (state, action) => {
      // 서버 호출 중....
      console.log("getUserAsyncThunk.pending .... ");
    });
    // 사용자 로그인
    builder.addCase(postLoginAsyncThunk.fulfilled, (state, action) => {
      console.log("postLoginAsyncThunk.fulfilled");
    });
    builder.addCase(postLoginAsyncThunk.rejected, (state, action) => {
      console.log("postLoginAsyncThunk.rejected");
    });
    builder.addCase(postLoginAsyncThunk.pending, (state, action) => {
      console.log("postLoginAsyncThunk.pending...");
    });
  },
});
export const { showUser } = userSlice.actions;
export default userSlice.reducer;
```

- RTKSample 업데이트

```js
import React from "react";
import Menu from "./components/Menu";
import { useDispatch, useSelector } from "react-redux";
import { changeEng, changeEtc, changeKor } from "./slices/langSlice";
import {
  getUserAsyncThunk,
  postLoginAsyncThunk,
  showUser,
} from "./slices/userSlice";

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
  console.log("사용자 정보 : ", userState);
  // 정보 호출
  const handleClickUser = () => {
    // 일반적 reducer 함수 호출
    // dispatch(showUser());
    // 비동기 extraReducer 호출
    // dispatch(getUserAsyncThunk());
    dispatch(postLoginAsyncThunk());
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
