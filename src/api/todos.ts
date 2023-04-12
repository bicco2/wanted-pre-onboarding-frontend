import axios from "axios";
import { API_BASE_URL } from "../constants/constants";
import { TodoItem } from "../constants/types";
import { GET_ACCESS_TOKEN } from "../api/users";

type CreateTodoHookType = (
  todo: string,
  todoListData: TodoItem[],
  setTodoListData: React.Dispatch<React.SetStateAction<TodoItem[]>>
) => void;

type UpdateTodoHookType = (
  target: HTMLInputElement,
  id: number,
  todoListData: TodoItem[],
  setTodoListData: React.Dispatch<React.SetStateAction<TodoItem[]>>
) => void;

export const CreateTodoHook: CreateTodoHookType = async (
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

export const UpdateCheckBoxHook: UpdateTodoHookType = async (
  target,
  id,
  todoListData,
  setTodoListData
) => {
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

export const DeleteTodoHook = async (
  id: number,
  setTodoListData: React.Dispatch<React.SetStateAction<TodoItem[]>>
) => {
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
