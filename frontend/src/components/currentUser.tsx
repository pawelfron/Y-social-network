import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./currentUser.css";
import logo from "../assets/Ylogo.jpg";

function CurrentUser() {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuVisible((prev) => !prev);

  const goToSettings = () => {
    navigate("/settings");
  };

  return (
    <div className="user-profile">
      <div className="user-info">
        <img src={logo} alt="User Avatar" className="user-avatar" />
        <div>
          <h3 className="user-name">Stas Neprokin</h3>
          <p className="user-username">@snecprickin</p>
        </div>
      </div>
      <button onClick={toggleMenu} className="logout-btn">
        ...
      </button>

      {menuVisible && (
        <div className="dropdown-menu">
          <button onClick={() => alert("Logged out")} className="dropdown-item">
            Log out
          </button>
          <button onClick={goToSettings} className="dropdown-item">
            Settings
          </button>
        </div>
      )}
    </div>
  );
}

export default CurrentUser;
