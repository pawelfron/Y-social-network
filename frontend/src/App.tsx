import { Routes, Route } from "react-router-dom";
import LeftBar from "./components/leftBar/leftBar";
import CurrentUser from "./components/currentUser/currentUser";
import RightMenu from "./segments/RightMenu";
import MainContent from "./segments/MainContent";
import Login from "./components/pages/Login";    
import Register from "./components/pages/Register"; 
import "./index.css";
import "./App.css";

function App() {
  return (
    <Routes>
      {/* Login Page */}
      <Route path="/" element={<Login />} />

      {/* Register Page */}
      <Route path="/register" element={<Register />} />

      {/* Home Page */}
      <Route path="/home" element={
        <div className="appContainer">
          <div className="leftSection">
            <LeftBar />
            <CurrentUser />
          </div>
          <div className="mainContent">
            <MainContent />
          </div>
          <div className="rightMenu">
            <RightMenu />
          </div>
        </div>
      } />
    </Routes>
  );
}

export default App;
