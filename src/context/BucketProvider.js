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
