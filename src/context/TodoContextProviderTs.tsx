import React, { createContext, useEffect, useReducer } from "react";

export const TODO_ACTION_TYPE = {
  ADD_TODO: "ADD_TODO",
  DELETE_TODO: "DELETE_TODO",
  MODIFY_TODO: "MODIFY_TODO",
};

export interface TodoContextType {
  state: Todo[];
  dispatch: React.Dispatch<Action>;
}

export const TodoContext = createContext<TodoContextType | null>(null);

export interface Todo {
  uid?: number | null | undefined;
  content?: string;
  isComplted?: boolean;
}
interface TodoState {
  todos: Todo[];
  nextId: number;
}

// 타입스크립트 :  as 데이터모양 문법
// 개발자가 강제로 데이터의 종류를 지정하겠다.
// vscode 야 간섭하지마

// 코드 팁
// JSON.parse(localStorage.getItem("todos") || "[]")
// JSON.parse 는 오로지 문자열에 대해서 적용된다.
// 그래서, "[]"  글자가 들어가게 된 것이다.
//  예) JSON.parse(localStorage.getItem("nextId") || "1")
//        "1" 도 참조

const initialState: TodoState = {
  todos: JSON.parse(localStorage.getItem("todos") || "[]") as Todo[],
  nextId: JSON.parse(localStorage.getItem("nextId") || "1") as number,
};

export interface Action {
  type: string;
  payload: Todo;
}

const todoReducer = (state: TodoState, action: Action): TodoState => {
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

interface TodoContextProviderTsProps {
  children?: React.ReactNode;
}
const TodoContextProviderTs: React.FC<TodoContextProviderTsProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

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

export default TodoContextProviderTs;
