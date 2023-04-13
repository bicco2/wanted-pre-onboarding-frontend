import { useState, useEffect, ChangeEvent } from "react";
import { TodoItem } from "../../constants/types";
import { CreateTodoHook, GetTodoHook } from "../../api/todos";
import TodoComponent from "../../components/TodoComponent";

export default function TodoPage() {
  const [todoListData, setTodoListData] = useState<TodoItem[]>([]);
  const [todo, setTodo] = useState("");

  // uninput 입력시 적용 함수
  const onTodoEnter = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  useEffect(() => {
    GetTodoHook(setTodoListData);
  }, []);

  return (
    <div>
      <input data-testid="new-todo-input" onChange={onTodoEnter} />
      <button
        data-testid="new-todo-add-button"
        onClick={() => CreateTodoHook(todo, todoListData, setTodoListData)}
      >
        추가
      </button>
      {todoListData.map((item: TodoItem) => (
        <TodoComponent
          key={item.id}
          info={{
            item: item,
            todoListData: todoListData,
            setTodoListData: setTodoListData,
          }}
        />
      ))}
    </div>
  );
}
