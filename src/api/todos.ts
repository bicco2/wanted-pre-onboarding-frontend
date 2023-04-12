import axios from "axios";
import { API_BASE_URL } from "../constants/constants";

import { GET_ACCESS_TOKEN } from "../api/users";

type TodoItem = {
  id: number;
  isCompleted: boolean;
  userId: number;
  todo: string;
};

type TodoCreateHookType = (
  todo: string,
  todoListData: TodoItem[],
  setTodoListData: React.Dispatch<React.SetStateAction<TodoItem[]>>
) => void;

export const CreateTodoHook: TodoCreateHookType = async (
  todo,
  todoListData,
  setTodoListData
) => {
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

export const GetTodoHook = async (
  setTodoListData: React.Dispatch<React.SetStateAction<TodoItem[]>>
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${GET_ACCESS_TOKEN}`,
    },
  };

  try {
    await axios.get(`${API_BASE_URL}/todos`, config).then((response) => {
      setTodoListData(response.data);
    });
  } catch (error) {
    console.error(error);
  }
};
