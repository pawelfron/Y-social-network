import React from "react";
import "./Profile.css";
import profileBackground from "../../../assets/background-photo.jpg";
import profileAvatar from "../../../assets/default-avatar.jpg";

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={profileBackground}
          alt="Profile Background"
          className="profile-background"
        />
        <div className="profile-details">
          <div className="profile-picture">
            <img
              src={profileAvatar}
              alt="Profile"
              className="profile-avatar"
            />
          </div>
          <div className="profile-info">
            <h2 className="profile-name">Stas Neprokin</h2>
            <p className="profile-username">@stasneprokin</p>
            <p className="profile-bio">Designing Products that Users Love</p>
            <p className="profile-additional-info">Entrepreneur · Earth</p>
            <p className="profile-birthdate">Born November 7, 1987</p>
            <p className="profile-join-date">Joined November 2010</p>
            <div className="profile-follow">
              <span className="profile-following">143 Following</span>
              <span className="profile-followers">149 Followers</span>
            </div>
          </div>
        </div>
      </div>
      <button className="follow-button">Follow</button>
    </div>
  );
};

export default Profile;
