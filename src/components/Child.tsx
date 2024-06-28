/* eslint-disable prefer-const */
import React, { useState } from "react";

interface ChildProps {
  children?: React.ReactNode;
}

const Child: React.FC<ChildProps> = ({ children }) => {
  const [level, setLevel] = useState<number>(0);
  const [userId, setUserId] = useState<string>("");
  const initData = [
    { pk: 1, title: "할일 1", complted: true },
    { pk: 1, title: "할일 1", complted: true },
    { pk: 1, title: "할일 1", complted: true },
    { pk: 1, title: "할일 1", complted: true },
    { pk: 1, title: "할일 1", complted: true },
  ];
  const [todoList, setTodoList] =
    useState<{ pk: number; title: string; complted: boolean }[]>(initData);

  return (
    <div
      onClick={() => {
        setLevel(0);
      }}
    >
      Child 입니다.
      <div>{children}</div>
    </div>
  );
};

export default Child;
