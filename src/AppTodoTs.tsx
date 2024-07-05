import React from "react";
import TodoContextProviderTs from "./components/TodoContextProviderTs";
import TodoListTs from "./components/todo/TodoListTs";
import TodoAddTs from "./components/todo/TodoAddTs";

const AppTodoTs: React.FC = () => {
  return (
    <TodoContextProviderTs>
      <TodoListTs />
      <TodoAddTs />
    </TodoContextProviderTs>
  );
};

export default AppTodoTs;
