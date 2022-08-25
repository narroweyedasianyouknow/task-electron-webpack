import React from "react";
import { GrClose } from "react-icons/gr";

import "./AppTitle.scss";
interface IAppTitle {
  title?: string;
}
const AppTitle = (props: IAppTitle) => {
  const { title } = props;
  return (
    <div className="header-wrapper">
      <div className="header-title">
        <div className="left-side">
          <span>{title}</span>
        </div>
        <div className="right-side">
          <span className="right-side--close-btn" onMouseDown={() => window.webApp.closeApp()}><GrClose /></span>
        </div>
      </div>
    </div>
  );
};
export default React.memo(AppTitle);
