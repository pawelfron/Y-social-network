import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./currentUser.css";
import logo from "../../assets/Ylogo.jpg";
import { useEffect, useRef } from "react";

function CurrentUser() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuVisible((prev) => !prev);

  const goToSettings = () => {
    navigate("/settings");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="user-profile" ref={menuRef}>
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
        <div className="dropdown-menu-user">
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
