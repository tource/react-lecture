# Context API 와 useReducer 활용

- useReducer
  : 앱 전체 상태, 즉 state 를 효율적으로 관리
  : 복잡한 state 에 대한 효율적 처리
  : 코드 가독성 좋음
  : Redux-Toolkit(RTK) 를 이해하기 위한 기초
  : 작은 규모의 프로젝트에서 적극적 활용

## 1. js 버전의 useReducer

- /src/bucketReducer.js

```js
import React, { createContext, useEffect, useReducer, useState } from "react";
// 목표는 useState 대신에 useReducer 활용

// 1단계 state 의 초기값 셋팅
// : 객체 리터럴을 사용한다.
// : 객체 리터럴에 필요한 만큼 key 이름을 정의한다.
const initialState = { bucket: [] };

// 2단계 상태를 업데이트 하는 함수를 생성
// : reducer 함수 만들기
// : 무조건 형식은 약속 되어 있음.
const bucketReducer = (state, action) => {
  // switch 문을 쓰세요.
  // state :  현재 값(상태)
  // action : {type:"구분 글자", payload: "업데이트할 값" }
  switch (action.type) {
    case "SET_BUCKET":
      return { ...state, bucket: action.payload };
    default:
      return state;
  }
};

export const BucketContext = createContext();
const BucketProvider = ({ children }) => {
  // 3단계 useReducer  훅 정의
  const [state, dispatch] = useReducer(bucketReducer, initialState);
  //   const [bucket, setBucket] = useState(null);

  useEffect(() => {
    // useState 초기값 셋팅
    // const 초기값 = [];

    // setBucket(초기값);
    // useReducer 를 이용한 state 초기값 셋팅
    // 형식이 정해져 있다.
    dispatch({ type: "SET_BUCKET", payload: [] });
  }, []);
  return (
    <BucketContext.Provider value={{ state, dispatch }}>
      {children}
    </BucketContext.Provider>
  );
};

export default BucketProvider;
```

- /src/AppRudcer.js

```js
import React, { useContext } from "react";
import BucketProvider, { BucketContext } from "./context/BucketProvider";

const AppReducer = () => {
  // contex 의 value 사용하겠다.
  //   const { bucket, setBucket } = useContext(BucketContext);
  const { state, dispatch } = useContext(BucketContext);

  const handleClick = () => {
    // setBucket([
    //   { pk: 1, goodname: "사과" },
    //   { pk: 2, goodname: "딸기" },
    // ]);
    const data = [
      { pk: 1, goodname: "사과" },
      { pk: 2, goodname: "딸기" },
    ];
    dispatch({ type: "SET_BUCKET", payload: data });
  };
  return (
    <BucketProvider>
      <div>
        <p>장바구니 목록 : {state.bucket[0].goodname}</p>
        <button
          onClick={() => {
            handleClick();
          }}
        >
          장바구니 업데이트
        </button>
      </div>
    </BucketProvider>
  );
};

export default AppReducer;
```

## 2. ts 버전의 useReducer

- /src/AppReducerTs.tsx

```ts
import React, { MouseEvent, useContext } from "react";
import BucketProviderTs, { BucketContext } from "./context/BucketProviderTs";

const AppReducerTs: React.FC = () => {
  // const { state, dispatch } = useContext(BucketContext);
  const context = useContext(BucketContext);
  // 초기에 context 가 null 기본 값을 가짐.
  if (!context) {
    throw new Error("null 입니다.");
  }
  const { state, dispatch } = context;

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    const data = [
      { pk: 1, goodname: "사과" },
      { pk: 2, goodname: "딸기" },
    ];
    dispatch({ type: "SET_BUCKET", payload: data });
  };
  return (
    <BucketProviderTs>
      <div>
        <p>장바구니 목록 : {state.bucket[0].goodname}</p>
        <button
          onClick={e => {
            handleClick(e);
          }}
        >
          장바구니 업데이트
        </button>
      </div>
    </BucketProviderTs>
  );
};

export default AppReducerTs;

```

- /src/context/BucketProviderTs.tsx

```tsx
import React, { Dispatch, createContext, useEffect, useReducer } from "react";
interface Item {
  pk: number;
  goodname: string;
}
interface State {
  bucket: Item[];
}
const initialState: State = { bucket: [] };

interface BucketAction {
  type: string;
  payload: Item[];
}

const bucketReducer = (state: State, action: BucketAction): State => {
  switch (action.type) {
    case "SET_BUCKET":
      return { ...state, bucket: action.payload };
    default:
      return state;
  }
};

interface BucketContextProps {
  state: State;
  dispatch: Dispatch<BucketAction>;
}
export const BucketContext = createContext<BucketContextProps | null>(null);

interface BucketProviderTsProps {
  children: React.ReactNode;
}
const BucketProviderTs: React.FC<BucketProviderTsProps> = ({ children }) => {
  const [state, dispatch] = useReducer(bucketReducer, initialState);

  useEffect(() => {
    dispatch({ type: "SET_BUCKET", payload: [] });
  }, []);

  return (
    <BucketContext.Provider value={{ state, dispatch }}>
      {children}
    </BucketContext.Provider>
  );
};

export default BucketProviderTs;
```
