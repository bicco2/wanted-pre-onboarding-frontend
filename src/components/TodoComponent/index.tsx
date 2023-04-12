import React, { useState } from "react";
import { UpdateCheckBoxHook, DeleteTodoHook } from "../../api/todos";
import { TodoItem } from "../../constants/types";

type Props = {
  info: {
    item: any;
    todoListData: TodoItem[];
    setTodoListData: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  };
};

export default function TodoComponent(props: Props) {
  const [active, setActive] = useState(false);

  return (
    <li key={props.info.item.id}>
      {active ? (
        <>
          <label>
            <input data-testid="modify-input" value={props.info.item.todo} />
          </label>
          <button data-testid="submit-button">제출</button>
          <button
            data-testid="cancel-button"
            onClick={() => setActive(!active)}
          >
            취소
          </button>
        </>
      ) : (
        <>
          <label>
            <input
              type="checkbox"
              checked={props.info.item.isCompleted}
              onChange={({ target }) => {
                UpdateCheckBoxHook(
                  target,
                  props.info.item.id,
                  props.info.todoListData,
                  props.info.setTodoListData
                );
              }}
            />
            <span>{props.info.item.todo}</span>
          </label>
          <button
            data-testid="modify-button"
            onClick={() => setActive(!active)}
          >
            수정
          </button>
          <button
            data-testid="delete-button"
            onClick={() =>
              DeleteTodoHook(props.info.item.id, props.info.setTodoListData)
            }
          >
            삭제
          </button>
        </>
      )}
    </li>
  );
}
