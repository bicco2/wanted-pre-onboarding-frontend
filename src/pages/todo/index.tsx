import "./index.scss";
import { useState, useEffect, ChangeEvent } from "react";
import { TodoItem } from "../../constants/types";
import { CreateTodoHook, GetTodoHook } from "../../api/todos";
import TodoComponent from "../../components/TodoComponent";
import { Navigate, useNavigate } from "react-router-dom";
import { HasToken } from "../../api/users";

export default function TodoPage() {
  const [todoListData, setTodoListData] = useState<TodoItem[]>([]);
  const [todo, setTodo] = useState("");

  const navigate = useNavigate();

  // uninput 입력시 적용 함수
  const onTodoEnter = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  useEffect(() => {
    GetTodoHook(setTodoListData);
  }, []);

  if (!HasToken()) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="container">
      <h2>TodoList</h2>
      <div>
        <input
          data-testid="new-todo-input"
          onChange={onTodoEnter}
          value={todo}
        />
        <button
          data-testid="new-todo-add-button"
          onClick={() => {
            CreateTodoHook(todo, todoListData, setTodoListData);
            setTodo("");
          }}
        >
          추가
        </button>
      </div>
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
      <button
        onClick={() => {
          localStorage.removeItem("ACCESS_TOKEN");
          navigate("/signin");
        }}
      >
        로그아웃
      </button>
    </div>
  );
}
