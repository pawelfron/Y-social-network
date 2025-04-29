import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LeftBar from "./components/leftBar/leftBar";
import CurrentUser from "./components/currentUser/currentUser";
import RightMenu from "./segments/RightMenu";
import "./index.css";
import "./App.css";
import MainContent from "./segments/MainContent";
import Notifications from "./segments/Notifications";
import Profile from "./components/ui/Profile/Profile";
import Login from "./components/ui/pages/Login";
import Register from "./components/ui/pages/Register";
import Explore from "./segments/Explore";
import Bookmarks from "./segments/Bookmarks";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Stan logowania

  // Funkcja do obsługi logowania
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
