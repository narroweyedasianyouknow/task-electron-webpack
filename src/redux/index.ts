import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./slice";

export const setupStore = () => {
  return configureStore({
    reducer: reducers,
  });
};

export type RootState = ReturnType<typeof reducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
