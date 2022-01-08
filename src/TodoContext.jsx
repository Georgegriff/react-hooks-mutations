import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
} from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [apiResponse, setApiResponse] = useState(undefined);
  const [draftTodos, setTodoList] = useState();
  const [saveMessage, setSaveMessage] = useState("");
  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("./todos.json");
      const response = await res.json();
      setApiResponse(response);
    };
    fetchTodos();
  }, []);

  const existingTodos = useCallback(() => {
    const todoMap = new Map();
    apiResponse?.todos.forEach((todo) => {
      todoMap.set(todo.id, todo);
    });

    return todoMap;
  }, [apiResponse]);

  useEffect(() => {
    // pass in initial items from server
    if (!draftTodos && existingTodos().size) {
      setTodoList(existingTodos());
    }
  }, [existingTodos]);

  return (
    <TodoContext.Provider
      value={{
        todoItems: draftTodos ? Array.from(draftTodos.values()) : [],
        checkTodo: (id, isDone) => {
          const existingItem = draftTodos.get(id);
          const newTodoItems = new Map(draftTodos);
          newTodoItems.set(id, {
            ...existingItem,
            done: isDone,
          });
          setTodoList(newTodoItems);
        },
        removeTodo: (id) => {
          if (draftTodos.delete(id)) {
            setTodoList(new Map(draftTodos));
          }
        },
        addTodo: (message) => {
          if (!message) {
            return;
          }
          let id;
          if ("crypto" in window && "randomUUID" in crypto) {
            id = crypto.randomUUID();
          } else {
            id = uuidv4();
          }

          const todo = {
            id,
            message,
            done: false,
          };
          if (draftTodos.has(todo.id)) return;
          draftTodos.set(todo.id, todo);
          setTodoList(new Map(draftTodos));
        },
        saveMessage,
        clearSaveMessage: () => setSaveMessage(""),
        save: () => {
          // contrived code for the demonstration
          // in the real app this was responsible for deciding if a request should be sent to server or not
          // (optimisation)
          const existingTodoKeys = Array.from(existingTodos().keys());
          const draftTodoKeys = Array.from(draftTodos.keys());
          let todosHasChanges =
            existingTodoKeys.length !== draftTodoKeys.length;
          // now check entries using ids, unless we know they have changed based on length
          if (!todosHasChanges) {
            const existingTodoValues = Array.from(existingTodos().values());
            const draftTodoValues = Array.from(draftTodos.values());
            for (
              let todoIndex = 0;
              todoIndex < draftTodoKeys.length;
              todoIndex++
            ) {
              if (
                existingTodoKeys[todoIndex] !== draftTodoKeys[todoIndex] ||
                existingTodoValues[todoIndex].done !==
                  draftTodoValues[todoIndex].done
              ) {
                todosHasChanges = true;
                break;
              }
            }
          }
          // in real could would make an api call to server here...
          if (todosHasChanges) {
            setSaveMessage(
              `Todos items were modified, total items: ${
                draftTodoKeys.length
              }, todo list: ${Array.from(draftTodos.values())
                .map(({ message, done }) => `${message} ${done ? "✅" : ""}`)
                .join(", ")}`
            );
          } else {
            setSaveMessage("No Todo items were changed.");
          }
        },
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export const useTodos = () => useContext(TodoContext);
