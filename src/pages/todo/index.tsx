import React, { useState, useEffect, ChangeEvent } from "react";

import axios from "axios";
import { API_BASE_URL } from "../../constants/constants";
import { GET_ACCESS_TOKEN } from "../../api/users";
import { CreateTodoHook, GetTodoHook } from "../../api/todos";

type TodoItem = {
  id: number;
  isCompleted: boolean;
  userId: number;
  todo: string;
};

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

  const test = async (target: any, id: number) => {
    const config = {
      headers: {
        Authorization: `Bearer ${GET_ACCESS_TOKEN}`,
      },
    };

    const findIndex = todoListData.findIndex((element) => element.id === id);

    try {
      await axios.put(
        `${API_BASE_URL}/todos/${id}`,
        {
          todo: `${todoListData[findIndex].todo}`,
          isCompleted: target.checked,
        },
        config
      );
      GetTodoHook(setTodoListData);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(todoListData, "afs");

  return (
    <div>
      <input data-testid="new-todo-input" onChange={onTodoEnter} />
      <button
        data-testid="new-todo-add-button"
        onClick={() => CreateTodoHook(todo, todoListData, setTodoListData)}
      >
        추가
      </button>
      {todoListData.map((item: TodoItem, index) => (
        <li key={item.id}>
          <label>
            <input
              type="checkbox"
              checked={item.isCompleted}
              onChange={({ target }) => {
                test(target, item.id);
              }}
            />
            <span> {item.todo}</span>
          </label>
          <button data-testid="modify-button">수정</button>
          <button data-testid="delete-button">삭제</button>
        </li>
      ))}
    </div>
  );
}
