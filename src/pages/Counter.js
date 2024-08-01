import React from "react";
import { useRecoilState } from "recoil";
import { counterState } from "../atoms/counterState";

const Counter = () => {
  // atom 활용
  const [count, setCount] = useRecoilState(counterState);
  return (
    <div>
      <h1>atom 전역변수 숫자</h1>
      <h2>Counter: {count}</h2>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        증가
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        감소
      </button>
    </div>
  );
};

export default Counter;
