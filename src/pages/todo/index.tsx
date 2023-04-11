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
  const [data, setData] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${GET_ACCESS_TOKEN}`,
      },
    };

    axios
      .get(`${API_BASE_URL}/todos`, config)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(data, "tododata");
  return (
    <div>
      <input data-testid="new-todo-input" />
      <button data-testid="new-todo-add-button">추가</button>
      {data.map((item: TodoItem, index) => (
        <li>
          <label>
            <input type="checkbox" />
            <span> {item.todo}</span>
          </label>
        </li>
      ))}
    </div>
  );
}
