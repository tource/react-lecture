import React, { memo } from "react";

const Child = () => {
  console.log("===> 자식 컴포넌트 입니다.");
  return (
    <div>
      <h1>자식컴포넌트</h1>
    </div>
  );
};

export default memo(Child);
