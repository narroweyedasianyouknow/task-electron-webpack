import classNames from "classnames";
import dayjs from "dayjs";
import { has } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isElectron } from "../../hooks/isElectron";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ITask } from "../../interfaces/ITask";
import { editTask } from "../../redux/slice/TasksSlice";
import "./TaskView.scss";
export const TaskView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tasks = useAppSelector((store) => store.tasks.tasks);
  const dispatch = useAppDispatch();
  const emptyTask = {
    title: "",
    description: "",
    created_at: 0,
    status: "",
    folder_id: "",
    task_id: "",
  };
  const [task, setTask] = useState<ITask>(emptyTask);
  useEffect(() => {
    const getItem = location.search;
    if (!getItem) {
      setTask(emptyTask);
    }
    const findTask = tasks.find(
      (task) => String(task.task_id) === String(getItem.replace("?", ""))
    );
    if (findTask) {
      setTask(findTask);
    }
  }, [tasks, location]);

const onClose = useCallback(() => {
  if(isElectron() && has(window, "electronAPI")){
      // @ts-expect-error
      window.electronAPI.closeTask(task)
    } else{
      navigate(`/`);
    }
  }, [navigate]);
  const onEditTask = useCallback(
    (name: string, value: string | null) => {
      dispatch(
        editTask({
          ...task,
          [name]: value ?? "",
        })
      );
    },
    [dispatch, editTask]
  );
  useEffect(() => {
    const keyListener = (key: KeyboardEvent) => {
      if (key.code === "Escape") {
        navigate("/");
      }
    };
    window.addEventListener("keyup", keyListener);
    return () => window.removeEventListener("keyup", keyListener);
  }, []);

  if (!task.title) {
    return null;
  }

  return (
    <div className={classNames({
      "dialog-root": true,
      "task-window": isElectron()
    })}>
      <div className="task-view">
        <div className="task-view__title">
          <div
            className="task-view__title--text"
            onBlur={({ currentTarget }) => {
              currentTarget.contentEditable = "false";
              onEditTask("title", currentTarget.textContent);
            }}
            spellCheck={false}
            onDoubleClick={({ currentTarget }) => {
              currentTarget.contentEditable = "true";
              currentTarget.focus();
            }}
            defaultValue={task.title}
            suppressContentEditableWarning
          >
            {task.title}
          </div>
          <div className="task-view__title--rightside">
            <div className="task-view__title--rightside-time">
              {dayjs(task.created_at).format("HH:mm DD/MM")}
            </div>
            <div
              className="task-view__title--rightside-close"
              onClick={onClose}
            ></div>
          </div>
        </div>
        <div className="task-view__description">
          <div
            spellCheck={false}
            onBlur={({ currentTarget }) => {
              currentTarget.contentEditable = "false";
              onEditTask("description", currentTarget.textContent);
            }}
            onDoubleClick={({ currentTarget }) => {
              currentTarget.contentEditable = "true";
              currentTarget.focus();
              currentTarget.textContent = task.description ?? "";
            }}
            className="task-view__description--text"
          >
            {task.description ? task.description : "Add description"}
          </div>
        </div>
      </div>
    </div>
  );
};
