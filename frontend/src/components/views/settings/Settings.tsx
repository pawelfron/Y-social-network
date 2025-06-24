import { useState } from "react";
import "./Settings.css";
import RightSettings from "./RightSettings.tsx";

const Settings = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null); 
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
