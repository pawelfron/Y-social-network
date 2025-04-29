import React, { useState } from "react";
import "./Settings.css";
import SearchBar from "../components/search_bar/SearchBar";
import RightSettings from "../components/RightSettings/RightSettings"; // Zaimportuj komponent RightSettings

const Settings = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null); // Stan aktywnego dropdownu

  // Funkcje do toggle'owania rozwijanych menu
  const togglePersonalization = () => {
    setActiveDropdown(
      activeDropdown === "personalization" ? null : "personalization"
    );
  };

  const toggleSettings = () => {
    setActiveDropdown(activeDropdown === "settings" ? null : "settings");
  };

  return (
    <div className="mainSettings">
      <div className="title">Settings</div>
      <SearchBar />
      <div className="dropdown-container">
        <div className="dropdown-item" onClick={togglePersonalization}>
          Account personalization
          <span className="arrow">
            {activeDropdown === "personalization" ? "▲" : "▼"}
          </span>
        </div>

        <div className="dropdown-item" onClick={toggleSettings}>
          Account settings
          <span className="arrow">
            {activeDropdown === "settings" ? "▲" : "▼"}
          </span>
        </div>
      </div>

      {/* Przekazanie aktywnego menu do RightSettings */}
      <RightSettings activeDropdown={activeDropdown} />
    </div>
  );
};

export default Settings;
