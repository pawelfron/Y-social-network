import React from "react";
import "./RightSettings.css";

const RightSettings = ({
  activeDropdown,
}: {
  activeDropdown: string | null; // Aktywny dropdown (personalization lub settings)
}) => {
  return (
    <div className="rightSettingsWrapper">
      {activeDropdown === "personalization" && (
        <div className="dropdown-menu">
          <div className="dropdown-item">Change theme</div>
          <div className="dropdown-item">Notifications preferences</div>
          <div className="dropdown-item">Language settings</div>
        </div>
      )}

      {activeDropdown === "settings" && (
        <div className="dropdown-menu">
          <div className="dropdown-item">Privacy settings</div>
          <div className="dropdown-item">Security settings</div>
          <div className="dropdown-item">Connected devices</div>
        </div>
      )}
    </div>
  );
};

export default RightSettings;
