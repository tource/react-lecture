/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, FormEvent, MouseEvent } from "react";
interface AppRootProps {
  children?: React.ReactNode;
  login: boolean;
  name: string;
}
interface IMember {
  age: number;
  name: string;
}

interface IHelloFunction {
  (message: string): string;
}

const AppRoot: React.FC<AppRootProps> = ({ children, login, name }) => {
  const a: number = 1; // 숫자출력하기
  const b: string = "hello"; // 문자출력하기
  const c: boolean = true; // 참, 거짓을 이용한 출력하기
  const d: undefined = undefined; // 값이 없다고 명시적으로 표현
  const e: null = null; // 값이 비었다.
  const f: number[] = [1, 2, 3]; // 배열
  const g: IMember = { age: 15, name: "hong" };

  const what: any = 1;

  function say(message: string): string {
    return message;
  }

  const hello: IHelloFunction = (message: string): string => {
    return message;
  };
  const ListTag: React.FC = (): JSX.Element => {
    return <div>안녕</div>;
  };

  const Add = (a: number | string, b: number | string): number | string => {
    if (typeof a === "string" || typeof b === "string") {
      return a.toString() + b.toString();
    } else {
      return a + b;
    }
  };

  const go = Add(4, 5);
  const go2 = Add("안녕", 5);
  const go3 = Add("안녕", "반가워");

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    console.log("안녕");
  };

  const handleDivClick = (e: MouseEvent<HTMLDivElement>): void => {
    console.log("반가워");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // 기본기능 막기
    e.preventDefault();
  };

  return (
    <div>
      <button
        onClick={e => {
          handleClick(e);
        }}
      >
        클릭
      </button>
      <div
        onClick={e => {
          handleDivClick(e);
        }}
      >
        레이아웃
      </div>

      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          onChange={e => {
            handleChange(e);
          }}
        />
      </form>
    </div>
  );
};
// const AppRoot = ({ children, login, name }: AppRootProps): JSX.Element => {
//   return <div></div>;
// };

// const AppRoot: React.FC<AppRootProps> = ({
//   children,
//   login,
//   name,
// }: AppRootProps): JSX.Element => {
//   return <div></div>;
// };

export default AppRoot;
