import { combineReducers } from "@reduxjs/toolkit";
import { taskReducer } from "./TasksSlice";

export const reducers = combineReducers({
  tasks: taskReducer,
});
