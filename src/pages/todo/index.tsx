import React, { useState, useEffect } from "react";

import axios from "axios";
import { API_BASE_URL } from "../../constants/constants";
import { GET_ACCESS_TOKEN } from "../../api/users";

type TodoItem = {
  id: number;
  isCompleted: boolean;
  userId: number;
  todo: string;
};

export default function TodoPage() {
  const [todoListData, setTodoListData] = useState<TodoItem[]>([]);
  const [todo, setTodo] = useState("");

  const onTodoChange = (e: any) => {
    setTodo(e.target.value);
  };

  const handleAddBtn = async () => {
    try {
      await axios
        .post(
          `${API_BASE_URL}/todos`,
          { todo: todo },
          {
            headers: {
              Authorization: `Bearer ${GET_ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setTodoListData([...todoListData, res.data]);
        });
    } catch (error) {
      alert("error");
      console.error(error);
    }
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${GET_ACCESS_TOKEN}`,
      },
    };

    axios
      .get(`${API_BASE_URL}/todos`, config)
      .then((response) => {
        setTodoListData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <input data-testid="new-todo-input" onChange={onTodoChange} />
      <button data-testid="new-todo-add-button" onClick={handleAddBtn}>
        추가
      </button>
      {todoListData.map((item: TodoItem, index) => (
        <li key={item.id}>
          <label>
            <input type="checkbox" />
            <span> {item.todo}</span>
          </label>
          <button data-testid="modify-button">수정</button>
          <button data-testid="delete-button">삭제</button>
        </li>
      ))}
    </div>
  );
}
