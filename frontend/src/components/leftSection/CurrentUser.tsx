import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./CurrentUser.css";
import logo from "../../assets/Ylogo.jpg";
import profileAvatar from "../../assets/default-avatar.jpg";
import { AuthService } from "../../services/authService";
import { UserService } from "../../services/userService";
import { UserDetails } from "../../interfaces/user";

interface LogoutProps {
  onLogout: () => void;
}

const CurrentUser: React.FC<LogoutProps> = ({ onLogout }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const authService = AuthService.get_instance();

  const [currentUser, setCurrentUser] = useState<UserDetails | null>(null);

  // Fetch user once
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUserId = authService.getUserId();
      if (!currentUserId) return;

      try {
        const user = await UserService.getUser(currentUserId);
        setCurrentUser(user);
      } catch (err) {
        console.error("Błąd pobierania aktualnego użytkownika:", err);
      }
    };

    fetchCurrentUser();
  }, [authService]);

  // Close dropdown when clicking outside
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

  // Early return while loading
  if (!currentUser) {
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
          src={currentUser.profile_photo || profileAvatar}
          alt="User Avatar"
          className="user-avatar"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = profileAvatar;
          }}
        />
        <div>
          <h3 className="user-name">{currentUser.first_name}</h3>
          <p className="user-username">@{currentUser.username}</p>
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
          <button onClick={goToSettings} className="dropdown-item">
            Settings
          </button>
        </div>
      )}
    </div>
  );
};

export default CurrentUser;
