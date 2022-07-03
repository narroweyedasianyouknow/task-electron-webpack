import localforage from "localforage";
import React, { useCallback, useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import MainPage from "./pages";

import { loadFromCahce } from "./redux/slice/TasksSlice";
const AppContext = React.createContext<{
  themeSwitcher?: () => void
}>({});

export const useAppContext = () => {
  return useContext(AppContext);
};

const App = () => {
  useEffect(() => {
    localforage.config({
      driver: [localforage.INDEXEDDB, localforage.WEBSQL],
      name: "TasksApp",
      version: 1,
      description: "TASK APP LIST",
    });
  }, []);
  const { isLoaded, tasks } = useAppSelector((store) => store.tasks);
  const dispatch = useAppDispatch();
  useEffect(() => {
    localforage.getItem("tasks").then((res) => {
      dispatch(loadFromCahce(res ?? []));
    });
  }, []);
  const addedTheme = () => {
    const localTheme = localStorage.getItem("theme") ?? "theme-light";
    const themes = ["theme-light", "theme-dark"];
    const themeValid = themes
      .map((v) => v.toLowerCase())
      .includes(localTheme.toLowerCase());

    themes.forEach((key) => document.body.classList.remove(key));

    document.body.classList.add(
      themeValid ? localTheme.toLowerCase() : themes[0]
    );
  };
  const storageListener = useCallback(() => {
    addedTheme();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("theme") === null)
      localStorage.setItem("theme", "theme-light");
    else {
      addedTheme();
    }
    window.addEventListener("storage", storageListener);

    return () => window.removeEventListener("storage", storageListener);
  }, [storageListener]);

  const themeSwitcher = () => {
    localStorage.setItem(
      "theme",
      localStorage.getItem("theme") === "theme-light"
        ? "theme-dark"
        : "theme-light"
    );
    addedTheme();
  };
  useEffect(() => {
    if (isLoaded && tasks.length > 0) {
      localforage.setItem("tasks", tasks);
    }
  }, [tasks, isLoaded]);
  return (
    <BrowserRouter>
      <AppContext.Provider value={{
        themeSwitcher: themeSwitcher
      }}>
        <MainPage />
      </AppContext.Provider>
    </BrowserRouter>
  );
};

export default App;
