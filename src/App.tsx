import React, { useEffect, useMemo, useRef, useState } from "react";
import AppTitle from "./components/AppTitle/AppTitle";
import { ON_LOAD_PAGE } from "./CONSTATNS";

const App = () => {
  const webRef = useRef<HTMLWebViewElement>(null);
  const [viewLink, setViewLink] = useState<string | null>(null);
  const [state, setState] = useState<"LOADING" | "LOADED">("LOADING")
  const [mainPage, setMainPage] = useState<string | null>(null);
  const currentLink = useMemo(
    () => viewLink ?? mainPage ?? "https://google.com",
    [viewLink, mainPage]
  );
  useEffect(() => {
    const loadstart = () => {
      setState("LOADING")
    }
    const loadstop = () => {
      setState("LOADED")
    }
    if(webRef && webRef.current){
      webRef.current.addEventListener('did-start-loading', loadstart)
      webRef.current.addEventListener('did-stop-loading', loadstop)
    }
  },[webRef])
  return (
    <div className="app-wrapper">
      <AppTitle title="test" indicatior={state} currentLink={{
        get: currentLink,
        set: setViewLink
      }} />
      <webview
        id={`tab-web-view`}
        autosize={false}
        contextMenu=""
        onLoadStart={() => {
          console.log("onLoadStart")
        }}
        onLoad={(e) => {
          console.log(e)
          document.dispatchEvent(new CustomEvent(ON_LOAD_PAGE, {
            detail: e
          }))
        }}
        onChange={() => {
          console.log('onChange')
        }}
        src={currentLink}
        onWaiting={() => {
          console.log('onWaiting')
        }}
        ref={webRef}
        className={"website-view-frame"}
      ></webview>
    </div>
  );
};
export default App;
