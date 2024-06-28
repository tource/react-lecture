/* eslint-disable @typescript-eslint/prefer-as-const */
import React from "react";
import Hi from "./components/Hi";
import Child from "./components/Child";
import Son from "./components/Son";

const AppRoot: React.FC = () => {
  const title: "React.FC 활용" = "React.FC 활용";
  const hobby: "축구" = "축구";
  const say: () => void = () => {
    console.log("안녕");
  };

  const info: {
    name: string;
    age: number;
  } = {
    name: "홍길동",
    age: 15,
  };
  return (
    <div>
      <h1>안녕하세요.</h1>
      <Hi nickname={"hong"} age={15} />
      <Child>
        <h2>나는 React.FC 의 children 속성이다.</h2>
      </Child>
      {/* <Son>
        <h2>나는 JSX.Element 의 children 이다.</h2>
      </Son> */}
    </div>
  );
};

export default AppRoot;
