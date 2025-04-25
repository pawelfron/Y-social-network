import { useState } from "react";
import LeftBar from "./components/leftBar/leftBar";
import CurrentUser from "./components/currentUser/currentUser";
import RightMenu from "./segments/RightMenu";
import "./index.css";
import "./App.css";
import MainContent from "./segments/MainContent";

function App() {
  return (
    <div className="appContainer">
      <div className="leftSection">
        <LeftBar />
        <CurrentUser />
      </div>
      <div className="mainContent">
        <MainContent/>
      </div>
      <div className="rightMenu">
        <RightMenu />
      </div>
    </div>
  );
}

export default App;
