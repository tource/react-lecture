import React, { useEffect, useReducer } from "react";
import { createContext } from "react";
// 1. 상태정보 즉 state 를 관리해줄 context 생성
export const TodoContext = createContext(null);
// 2. Reducer 즉, 상태를 업데이트 및 관리 할 수 있는 기능을 부여하기 위한 작업
// 2.1. 관리하고 싶은 데이터의 기본 설정을 진행한다.

// 데이터 저장하기 및 불러오기 (localStorage 활용)
// 저장이 된 내용은 단순한 글자입니다. 모양이 {...} 이더라도 그냥 글자입니다.
const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  // 현재 새로운 할일이 등록되면 고유한 id 를 부여해야 한다.
  // 고유한 id 를 uid 라고 합니다.
  // uid 는 unique id 라고 합니다.
  // BE 는 pk 라고 하기도 합니다.
  // 보통 {id:시간, contents:할일, isCompleted:완료여부}
  // Context 에서 값을 증가 시킴으로 처리
  nextId: JSON.parse(localStorage.getItem("nextId")) || 1,
};
// 2.2. Reducer 함수를 만들어줌. (dispatch 하면 실행될 함수)
// - Reducer 함수에는 매개변수 2개가 약속
// - state :  관리할 데이터
// - action: 객체 {type, payload}

// 2.3. 가능하면 action.type 은 상수로 만든다.
export const TODO_ACTION_TYPE = {
  ADD_TODO: "ADD_TODO",
  DELETE_TODO: "DELETE_TODO",
  MODIFY_TODO: "MODIFY_TODO",
};

const totoReducer = (state, action) => {
  // 관례상 switch 문
  switch (action.type) {
    case TODO_ACTION_TYPE.ADD_TODO:
      // action.payload 에 담긴 데이터를 state 로 업데이트 한다.
      return {
        ...state,
        todos: [...state.todos, { ...action.payload, uid: state.nextId }],
        nextId: state.nextId + 1,
      };
    case TODO_ACTION_TYPE.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(item => item.uid !== action.payload.uid),
      };

    case TODO_ACTION_TYPE.MODIFY_TODO:
      return {
        ...state,
        todos: state.todos.map(item =>
          item.uid === action.payload.uid
            ? { ...item, ...action.payload }
            : item,
        ),
      };
    default:
      return state;
  }
};

const TodoContextProvider = ({ children }) => {
  // 2.3. useReducer (dispatch 용 함수, 초기값 설정)
  const [state, dispatch] = useReducer(totoReducer, initialState);

  // localStorage 데이터 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
    localStorage.setItem("nextId", JSON.stringify(state.nextId));
  }, [state]);
  return (
    <TodoContext.Provider value={{ state: state.todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
