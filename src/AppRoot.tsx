import React, { useState } from "react";
// props 데이터 정의(형태만들기)
// 개발자가 데이터 정의할때 문법 ( interface, type )
interface AppRootProps {
  children?: React.ReactNode;
}

// 사용자 데이터 정의
interface IUser {
  pk?: number;
  id?: string;
  level?: number;
  login?: boolean;
}

// 학생정보 데이터모양
interface Istudents {
  pk: number;
  name: string;
  hobby: string;
}

const AppRoot: React.FC<AppRootProps> = ({ children }) => {
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [login, setLogin] = useState<boolean>(false);
  const [todos, setTodos] = useState<[]>([]);
  const [info, setInfo] = useState<null>(null);
  // 객체 데이터 정의하기
  const member = {
    pk: 1,
    id: "hong",
    level: 10,
  };
  const [user, setUser] = useState<IUser>(member);
  // 여러가지 종류의 데이터를 기본 값으로 설정
  const [userValue, setUserValue] = useState<number | string>("");
  setUserValue("A");
  const [userPoint, setUserPoint] = useState<
    boolean | null | undefined | number | string
  >(false);
  setUserPoint(null);
  setUserPoint(undefined);
  setUserPoint(0);
  setUserPoint("1200");

  // 배열에 데이터 명시하기
  const [tourList, setTourList] = useState<string[]>(["대구", "광주", "경주"]);
  const [priceList, setPriceList] = useState<number[]>([1000, 2000, 3000]);
  const [good, setGood] = useState<(string | number | boolean)[]>([
    "수박",
    5000,
    0.5,
    true,
  ]);
  const students = [
    { pk: 1, name: "홍길동", hobby: "축구" },
    { pk: 2, name: "고길동", hobby: "등산" },
    { pk: 3, name: "박길동", hobby: "산책" },
  ];
  const [studentList, setStudentList] = useState<Istudents[]>(students);

  return (
    <div>
      {count}
      {name}
      {login}
      {todos}
      {info}
      {member.pk}
      {userValue}
      {tourList}
      {priceList}
      {good}
      {studentList[0].name}
    </div>
  );
};
// const AppRoot = ({ children }: AppRootProps): JSX.Element => {
//   return <div>{children}</div>;
// };
// const AppRoot: React.FC<AppRootProps> = ({
//   children,
// }: AppRootProps): JSX.Element => {
//   return <div>{children}</div>;
// };

export default AppRoot;
