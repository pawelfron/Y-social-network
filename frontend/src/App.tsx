import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import LeftBar from "./segments/app/LeftBar.tsx";
import CurrentUser from "./components/leftSection/CurrentUser.tsx";
import RightMenu from "./segments/app/RightMenu.tsx";
import "./index.css";
import "./App.css";
import MainContent from "./segments/app/MainContent.tsx";
import Notifications from "./components/views/Notifications.tsx";
import Profile from "./components/views/Profile.tsx";
import Login from "./segments/auth/Login.tsx";
import Register from "./segments/auth/Register.tsx";
import Explore from "./components/views/explore/Explore.tsx";
import Bookmarks from "./components/views/Bookmarks.tsx";
import Settings from "./components/views/settings/Settings.tsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleLogin = () => setIsAuthenticated(true);

  return (
    <div className="appContainer">
      {isAuthenticated ? (
        <div className="mainLayout">
          <div className="leftSection">
            <LeftBar />
            <CurrentUser />
          </div>
          <div className="mainContent">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <div className="rightMenu">
            <RightMenu />
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
