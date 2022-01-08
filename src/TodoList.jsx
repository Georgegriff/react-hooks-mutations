import React from "react";
import { useTodos } from "./TodoContext";

export const TodoList = () => {
  const { todoItems, checkTodo, removeTodo } = useTodos();
  return (
    <ol className="TodoList">
      {todoItems
        ? todoItems.map(({ id, message, done }) => (
            <li key={id}>
              <input
                id={id}
                className="Checkbox"
                type="checkbox"
                onChange={(e) => checkTodo(id, e.target.checked)}
                checked={done}
              />
              <label htmlFor={id}>{message}</label>
              <button
                onClick={() => removeTodo(id)}
                className="Button"
                aria-label="Delete todo item"
              >
                🗑️
              </button>
            </li>
          ))
        : null}
    </ol>
  );
};
