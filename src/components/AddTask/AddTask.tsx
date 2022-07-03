import classNames from "classnames";
import React, { useCallback, useState } from "react";
import { v4 } from "uuid";
import { useAppDispatch } from "../../hooks/redux";
import { ITask } from "../../interfaces/ITask";

import { addTask } from "../../redux/slice/TasksSlice";

import "./AddTask.scss";

const AddTask = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const updateTask = useCallback(() => {
    if (value.split(" ").join("").length === 0) {
      return setError(true);
    }
    const newTask: ITask = {
      title: value,
      created_at: Date.now(),
      status: "created",
      folder_id: "",
      task_id: v4(),
      description: "",
    };

    dispatch(addTask(newTask));
    setValue("");
  }, [dispatch, value]);

  return (
    <div className="add-new-task">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateTask();
        }}
      >
        <label>
          <p>Add Task</p>
          <input
            onFocus={() => {
              setError(false);
            }}
            value={value}
            className={classNames({
              "add-new-task--input": true,
              "input-error": error,
            })}
            placeholder={"Enter Task"}
            onChange={({ target }) => {
              if (error) {
                setError(false);
              }
              setValue(target.value);
            }}
          />
        </label>
        <button className="btn" type="submit">
          Create new task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
