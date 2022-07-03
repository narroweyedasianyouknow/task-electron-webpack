import React, { useMemo, useState } from "react";
import { useAppContext } from "../App";
import { TasksList, TaskView } from "../components";
import AddTask from "../components/AddTask/AddTask";

import "./index.scss";

const MainPage = () => {
  const { themeSwitcher } = useAppContext();
  const [themeChanged, setThemeChanged] = useState("");
  const themeBtn = useMemo(() => {
    return (
      <button
        className="btn theme-switcher"
        onClick={() => {
          themeSwitcher && themeSwitcher();
          setThemeChanged(
            localStorage.getItem("theme") === "theme-light"
              ? "theme-light"
              : "theme-dark"
          );
        }}
      >
        {localStorage.getItem("theme") === "theme-light"
          ? "theme-light"
          : "theme-dark"}
      </button>
    );
  }, [themeChanged]);

  return (
    <div className="whole-picture">
      <header className="header">
        <AddTask />
        {themeBtn}
      </header>
        <TaskView />
        <TasksList />
    </div>
  );
};

export default MainPage;
