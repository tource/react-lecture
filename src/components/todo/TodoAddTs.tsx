import React, { KeyboardEvent, useContext, useState } from "react";
import {
  Action,
  TODO_ACTION_TYPE,
  TodoContext,
  TodoContextType,
} from "../../context/TodoContextProviderTs";

const TodoAddTs: React.FC = () => {
  // 타입스크립트 useContext 예외처리 방법 1.
  // const context = useContext(TodoContext);
  // if(!context) {
  //   throw Error("없어요")
  // }
  // const {dispatch} = context;

  // 타입스크립트 useContext as 처리 방법 2.
  const { dispatch } = useContext(TodoContext) as TodoContextType;
  const [content, setContent] = useState<string>("");
  const handleClick = () => {
    // 공백처리
    if (content.trim() === "") {
      alert("내용을 입력하세요.");
      return;
    }
    const todo: Action = {
      type: TODO_ACTION_TYPE.ADD_TODO,
      payload: { content: content, isComplted: false },
    };
    dispatch(todo);
    setContent("");
  };

  // 입력창 Enter 키 처리
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={content}
        onKeyDown={e => {
          handleKeyPress(e);
        }}
        onChange={e => {
          setContent(e.target.value);
        }}
      />
      <button
        onClick={() => {
          handleClick();
        }}
      >
        할일 추가
      </button>
    </div>
  );
};

export default TodoAddTs;
