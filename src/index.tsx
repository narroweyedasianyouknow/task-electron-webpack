import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.scss'
declare global {
  interface global {
    fullSized: boolean;
  }
  interface Window {
    fullSized: boolean,
    webApp: {
      closeApp: () => void;
      minimizeApp: () => void;
      fullscreenApp: () => void;
    };
  }
}


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
