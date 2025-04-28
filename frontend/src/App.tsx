import { Routes, Route, Navigate} from 'react-router-dom';
import { useState } from "react";
import LeftBar from "./components/leftBar/leftBar";
import CurrentUser from "./components/currentUser/currentUser";
import RightMenu from "./segments/RightMenu";
import "./index.css";
import "./App.css";
import MainContent from "./segments/MainContent";
import Notifications from './segments/Notifications';
import Profile from './components/ui/Profile/Profile';
import Login from './components/ui/pages/Login';
import Register from './components/ui/pages/Register';


function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(true);  // Stan logowania

  // // Funkcja do obsługi logowania / wylogowywania
  // const handleLogin = () => setIsAuthenticated(true);
  // const handleLogout = () => setIsAuthenticated(false);

  return (
    <div className="appContainer">
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
              {/* Możliwość wylogowania
              <Route path="/logout" element={<button onClick={handleLogout}>Logout</button>} /> */}
            </Routes>
          </div>
          <div className="rightMenu">
            <RightMenu />
          </div>
        </div>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
        </Routes>
    </div>
  );
}


export default App;
