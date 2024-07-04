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
