import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../interfaces/ITask";
import { ITaskSlice } from "../../interfaces/ITaskSlice";

const initialState: ITaskSlice = {
  isLoaded: false,
  tasks: [],
};

const TasksSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    addTask(state, action) {
      const newArr = Array.from(state.tasks);
      newArr.push(action.payload);
      state.tasks = newArr;
    },

    loadFromCahce(state, action) {
      state.tasks = action.payload;
      state.isLoaded = true;
    },
    removeTask(state, action) {
      const payload = action.payload as ITask;
      const findIndex = state.tasks.findIndex(
        (task) => payload.task_id === task.task_id
      );
      if (findIndex !== -1) {
        state.tasks.splice(findIndex, 1);
      }
    },
    editTask(state, action) {
      const payload = action.payload;
      const newArr = Array.from(state.tasks);
      const findIndex = newArr.findIndex(
        (task) => task.task_id === payload.task_id
      );
      if (findIndex && findIndex !== -1) {
        newArr.splice(findIndex, 1, payload);
        state.tasks = newArr;
      }
    },
  },
});

export const taskReducer = TasksSlice.reducer;
export const { addTask, editTask, removeTask, loadFromCahce } =
  TasksSlice.actions;
