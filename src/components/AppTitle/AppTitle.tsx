import React, { useState, useEffect, useMemo } from "react";
import { GrClose } from "react-icons/gr";
import { FaRegWindowMinimize } from "react-icons/fa";
import { RiFullscreenFill, RiFullscreenExitFill, RiLoader2Fill } from "react-icons/ri";
import { AiOutlineReloar } from "react-icons/ai";
import { ON_LOAD_PAGE } from "./../../CONSTATNS";

import "./AppTitle.scss";
interface IAppTitle {
  title?: string;
  currentLink?: {
    get: string;
    set: (e: string) => void;
  };
  indicatior?: "LOADED" | "LOADING"
}
const AppTitle = (props: IAppTitle) => {
  const { title, currentLink, indicatior } = props;
  const loading = useMemo(() => {
    if(indicatior === 'LOADING'){
      return <AiOutlineReloar className="indicatior indicatior--loading" />
    } else if (indicatior === 'LOADED'){
      return 'AiOutlineLoading'
    } else {
      return null
    }
  },[indicatior])
  const [inputLink, setInputLink] = useState(currentLink?.get);
  return (
    <div className="header-wrapper">
      <div className="header-title">
        <div className="left-side">
          <span>{title}</span>
        </div>
        <div className="center-side">
          <form onSubmit={(e) => {
            e.preventDefault();
            currentLink?.set(inputLink)
          }}>
            {loading}
            <input
              type="text"
              onChange={({ target }) => setInputLink(target.value)}
              value={inputLink}
            />
          </form>
        </div>
        <div className="right-side">
          <span
            className="right-side--minimize-btn"
            onClick={() => window.webApp.minimizeApp()}
          >
            <FaRegWindowMinimize />
          </span>
          <span
            className="right-side--fullscreen-btn"
            onClick={() => window.webApp.fullscreenApp()}
          >
            {window.fullSized ? <RiFullscreenExitFill /> : <RiFullscreenFill />}
          </span>
          <span
            className="right-side--close-btn"
            onClick={() => window.webApp.closeApp()}
          >
            <GrClose />
          </span>
        </div>
      </div>
    </div>
  );
};
export default React.memo(AppTitle);
