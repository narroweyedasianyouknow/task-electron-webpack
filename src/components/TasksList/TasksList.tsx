import React, { useCallback, useMemo } from "react";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { has } from "lodash";
import "./TasksList.scss";
import { removeTask } from "../../redux/slice/TasksSlice";
import { useNavigate } from "react-router-dom";
import { isElectron } from "../../hooks/isElectron";
import classNames from "classnames";

export const TasksList = () => {
  const { tasks } = useAppSelector((store) => store.tasks);
  const dispatch = useAppDispatch();
  const tasksList = useMemo(() => {
    return Array.from(tasks).sort((a, b) =>
      a.created_at < b.created_at ? 1 : -1
    );
  }, [tasks]);

  const navigate = useNavigate();
  const onClickTask = useCallback(
    (task: string, currentTarget?: EventTarget & HTMLDivElement) => {
      if(isElectron() && has(window, "electronAPI")){
        // @ts-expect-error
        window.electronAPI.openTask(task)
      } else{
        navigate(`?${task}`);
      }
    },
    [navigate, isElectron]
  );
  return (
    <div className="tasks-list">
      {tasksList.map((task) => (
        <div
          key={task.task_id}
          className="task-item"
          onDoubleClick={() => onClickTask(task.task_id)}
        >
          <div className="task-item__title">
            <p className="task-item__title-text">{task.title}</p>
            <p className="task-item__title-time">
              {dayjs(task.created_at).format("HH:mm DD/MM")}
            </p>
          </div>
          <button
            className="btn task-item--remove"
            onClick={() => dispatch(removeTask(task))}
          >
            Remove
          </button>
          {task.description && (
            <div className="task-item__description">{task.description}</div>
          )}
        </div>
      ))}
    </div>
  );
};
