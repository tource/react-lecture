import React, { useContext, useState } from "react";
import { TodoContext } from "../../context/TodoContextProvider";

const TodoAdd = () => {
  // context 에 연결된  state 관리 Reducer 함수 를 호출함.
  const { dispatch } = useContext(TodoContext);

  // 사용자가 입력한 내용
  const [content, setContent] = useState("");

  const handleClick = () => {
    // 공백처리
    if (content.trim() === "") {
      alert("내용을 입력하세요.");
      return;
    }
    const todo = {
      type: "ADD_TODO",
      payload: { content: content, isComplted: false },
    };
    dispatch(todo);
    setContent("");
  };
  // 입력창 Enter 키 처리
  const handleKeyPress = e => {
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

export default TodoAdd;
