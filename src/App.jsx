import React from "react";
import { AddTodo } from "./AddTodo";
import "./App.css";
import { SaveMessage } from "./SaveMessage";
import { SaveTodos } from "./SaveTodos";
import { TodoProvider } from "./TodoContext";
import { TodoList } from "./TodoList";
function App() {
  return (
    <TodoProvider>
      <div className="App">
        <div className="Flex">
          <h1>Todo list</h1>
          <SaveTodos />
        </div>
        <SaveMessage />
        <AddTodo />
        <div>
          <h2>Items to do</h2>
          <TodoList />
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
