import { Routes, Route } from 'react-router-dom';
import { useState } from "react";
import LeftBar from "./components/leftBar/leftBar";
import CurrentUser from "./components/currentUser/currentUser";
import RightMenu from "./segments/RightMenu";
import "./index.css";
import "./App.css";
import MainContent from "./segments/MainContent";
import Notifications from './segments/Notifications';

function App() {
  return (
    <div className="appContainer">
      <div className="leftSection">
        <LeftBar />
        <CurrentUser />
      </div>
      <div className="mainContent">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
      <div className="rightMenu">
        <RightMenu />
      </div>
    </div>
  );
}

export default App;
