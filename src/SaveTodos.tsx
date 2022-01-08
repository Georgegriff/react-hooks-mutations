import React from "react";
import { useTodos } from "./TodoContext";
export const SaveTodos = () => {
  const { save } = useTodos();
  return (
    <button onClick={() => save()} className="Button Save">
      Save
    </button>
  );
};
