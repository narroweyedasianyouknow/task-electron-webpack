import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.scss'
declare global {
  interface Window { webApp: {
    closeApp: () => void
  }; }
}


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
