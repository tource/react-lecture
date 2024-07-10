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
