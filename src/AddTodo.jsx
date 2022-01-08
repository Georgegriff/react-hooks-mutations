import { useTodos } from "./TodoContext";

export const AddTodo = () => {
  const { addTodo } = useTodos();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formEntries = new FormData(e.target);
        addTodo(formEntries.get("message"));
      }}
    >
      <input
        className="Input SearchBox"
        name="message"
        placeholder="New item..."
        id="addItem"
        type="text"
      />

      <button className="Button" type="submit" aria-label="Add item">
        ➕
      </button>
    </form>
  );
};
