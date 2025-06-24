import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./CurrentUser.css";
import profileAvatar from "../../assets/default-avatar.jpg";
import { AuthService } from "../../services/authService";
import { useUser } from "../../contexts/UserContext";

interface LogoutProps {
  onLogout: () => void;
}

const CurrentUser: React.FC<LogoutProps> = ({ onLogout }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const authService = AuthService.get_instance();


  const {user} = useUser();

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

  const toggleMenu = () => setMenuVisible((prev) => !prev);

  const goToSettings = () => navigate("/settings");

  const handleLogout = () => {
    authService.logout();
    onLogout();
    navigate("/login");
  };

  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // Early return while loading
  if (!user) {
    return (
      <div className="user-profile-placeholder">
        <img
          src={profileAvatar}
          alt="Loading avatar"
          className="user-avatar"
        />
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="user-profile" ref={menuRef}>
      <div className="user-info">
        <img
          src={user?.profile_photo || profileAvatar}
          alt="User Avatar"
          className="user-avatar"
          onClick={() => {
            if (isMobileView) toggleMenu();
          }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = profileAvatar;
          }}
          style={{ cursor: isMobileView ? "pointer" : "default" }}
        />

        <div>
          <h3 className="user-name">{user.first_name}</h3>
          <p className="user-username">@{user.username}</p>
        </div>
      </div>
      <button onClick={toggleMenu} className="logout-btn">
        ...
      </button>

      {menuVisible && (
        <div className="dropdown-menu-user">
          <button onClick={handleLogout} className="dropdown-item">
            Log out
          </button>
          {!isMobileView && (
            <button onClick={goToSettings} className="dropdown-item">
              Settings
            </button>
          )}

        </div>
      )}
    </div>
  );
};

export default CurrentUser;
