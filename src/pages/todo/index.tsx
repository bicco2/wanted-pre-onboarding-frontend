import React, { useState, useEffect, ChangeEvent } from "react";
import { TodoItem } from "../../constants/types";
import axios from "axios";
import { API_BASE_URL } from "../../constants/constants";
import { GET_ACCESS_TOKEN } from "../../api/users";
import {
  CreateTodoHook,
  GetTodoHook,
  UpdateCheckBoxHook,
  DeleteTodoHook,
} from "../../api/todos";
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

  // console.log(todoListData, "afs");

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
        // <li key={item.id}>
        //   <label>
        //     <input
        //       type="checkbox"
        //       checked={item.isCompleted}
        //       onChange={({ target }) => {
        //         UpdateCheckBoxHook(
        //           target,
        //           item.id,
        //           todoListData,
        //           setTodoListData
        //         );
        //       }}
        //     />
        //     <span> {item.todo}</span>
        //   </label>
        //   <button data-testid="modify-button">수정</button>
        //   <button
        //     data-testid="delete-button"
        //     onClick={() => DeleteTodoHook(item.id, setTodoListData)}
        //   >
        //     삭제
        //   </button>
        //   <TodoComponent
        //     {...[item, todoListData, setTodoListData]}
        //   />
        // </li>
        <TodoComponent
          info={{
            item: item,
            todoListData: todoListData,
            setTodoListData: setTodoListData,
          }}
          // {...[item, todoListData, setTodoListData]}
        />
      ))}
    </div>
  );
}
