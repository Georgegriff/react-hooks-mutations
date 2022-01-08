import { useTodos } from "./TodoContext";

export const SaveMessage = () => {
  const { saveMessage, clearSaveMessage } = useTodos();
  return saveMessage ? (
    <div className="SaveMessage">
      <div>{saveMessage}</div>
      <button className="Button Clear" onClick={() => clearSaveMessage()}>
        Clear
      </button>
    </div>
  ) : null;
};
