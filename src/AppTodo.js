import React from "react";
import TodoList from "./components/todo/TodoList";
import TodoAdd from "./components/todo/TodoAdd";
import TodoContextProvider from "./context/TodoContextProvider";

const AppTodo = () => {
  return (
    <TodoContextProvider>
      <TodoList />
      <TodoAdd />
    </TodoContextProvider>
  );
};

export default AppTodo;
