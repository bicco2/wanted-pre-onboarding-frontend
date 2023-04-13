import axios from "axios";

import { API_BASE_URL } from "../constants/constants";
import { TodoItem } from "../constants/types";

type CreateTodoHookType = (
  todo: string,
  todoListData: TodoItem[],
  setTodoListData: React.Dispatch<React.SetStateAction<TodoItem[]>>
) => void;

type UpdateCheckBoxHookType = (
  target: HTMLInputElement,
  id: number,
  todoListData: TodoItem[],
  setTodoListData: React.Dispatch<React.SetStateAction<TodoItem[]>>
) => void;

type UpdateTodoHookType = (
  value: any,
  item: TodoItem,
  todoListData: TodoItem[],
  setTodoListData: React.Dispatch<React.SetStateAction<TodoItem[]>>
) => void;

export const CreateTodoHook: CreateTodoHookType = async (
  todo,
  todoListData,
  setTodoListData
) => {
  const GET_ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
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
  const GET_ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
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

export const UpdateCheckBoxHook: UpdateCheckBoxHookType = async (
  target,
  id,
  todoListData,
  setTodoListData
) => {
  const GET_ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
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

export const UpdateTodoHook: UpdateTodoHookType = async (
  value,
  item,
  todoListData,
  setTodoListData
) => {
  const GET_ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
  const config = {
    headers: {
      Authorization: `Bearer ${GET_ACCESS_TOKEN}`,
    },
  };

  try {
    await axios.put(
      `${API_BASE_URL}/todos/${item.id}`,
      {
        todo: value,
        isCompleted: item.isCompleted,
      },
      config
    );
    GetTodoHook(setTodoListData);
  } catch (error) {
    console.error(error);
  }
};

export const DeleteTodoHook = async (
  id: number,
  setTodoListData: React.Dispatch<React.SetStateAction<TodoItem[]>>
) => {
  const GET_ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
  const config = {
    headers: {
      Authorization: `Bearer ${GET_ACCESS_TOKEN}`,
    },
  };

  try {
    await axios.delete(`${API_BASE_URL}/todos/${id}`, config);
    GetTodoHook(setTodoListData);
  } catch (error) {
    console.error(error);
  }
};
