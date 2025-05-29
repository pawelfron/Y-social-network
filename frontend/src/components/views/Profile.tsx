import React, { useEffect, useState } from "react";
import "./Profile.css";
import profileBackground from "../../assets/background-photo.jpg";
import profileAvatar from "../../assets/default-avatar.jpg";
import { useParams } from "react-router-dom";
import { UserService } from "../../services/userService";
import { UserDetails } from "../../interfaces/user";
import { AuthService } from "../../services/authService";

const Profile = () => {
  const { userId } = useParams();
  const parsedUserId = userId ? parseInt(userId, 10) : undefined;

  const authService = AuthService.get_instance();
  const currentUserId = authService.getUserId();

  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedPhoto, setEditedPhoto] = useState("");
  const [editedBio, setEditedBio] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      if (!parsedUserId) return;

      try {
        const userData = await UserService.getUser(parsedUserId);
        setUser(userData);
      } catch (error) {
        console.error("Błąd podczas pobierania użytkownika:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [parsedUserId]);

  const startEditing = () => {
    if (user) {
      setEditedFirstName(user.first_name || "");
      setEditedLastName(user.last_name || "");
      setEditedPhoto(user.profile_photo || "");
      setEditedBio(user.profile_description || "");
      setIsEditing(true);
    }
  };

  const saveProfileChanges = async () => {
    if (!user) return;

    try {
      const updateData = {
        username: user.username,
        first_name: editedFirstName,
        last_name: editedLastName,
        //profile_photo: editedPhoto,
        profile_description: editedBio,
      };

      await UserService.editUser(user.id, updateData);
      setUser((prev) =>
        prev
          ? {
              ...prev,
              ...updateData,
            }
          : prev
      );
      setIsEditing(false);
    } catch (err) {
      console.error("Błąd edycji profilu", err);
    }
  };

  if (loading) return <div>Ładowanie profilu...</div>;
  if (!user) return <div>Nie znaleziono użytkownika</div>;

  const showEditButton = parsedUserId === currentUserId && !isEditing;
  const showFollowButton = parsedUserId !== currentUserId && !isEditing;

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
              src={user.profile_photo || profileAvatar}
              alt="Profile"
              className="profile-avatar"
            />
          </div>
          <div className="profile-info">
            {isEditing ? (
              <div className="edit-profile-form">
                <input type="text" value={user.username} readOnly />
                <input
                  type="text"
                  value={editedFirstName}
                  onChange={(e) => setEditedFirstName(e.target.value)}
                  placeholder="First name"
                />
                <input
                  type="text"
                  value={editedLastName}
                  onChange={(e) => setEditedLastName(e.target.value)}
                  placeholder="Last name"
                />
                <input
                  type="text"
                  value={editedPhoto}
                  onChange={(e) => setEditedPhoto(e.target.value)}
                  placeholder="Profile photo URL"
                />
                <textarea
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  rows={3}
                  placeholder="Bio"
                />
                <div className="edit-profile-buttons">
                  <button onClick={saveProfileChanges} className="save-button">Save</button>
                  <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="profile-name">{user.first_name} {user.last_name}</h2>
                <p className="profile-username">@{user.username}</p>
                <p className="profile-bio">{user.profile_description}</p>
                <p className="profile-join-date">
                  Joined {new Date(user.date_joined).toLocaleString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <div className="profile-follow">
                  <span className="profile-following">{user.following_count} Following</span>
                  <span className="profile-followers">{user.followers_count} Followers</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {showEditButton && (
        <button className="edit-button" onClick={startEditing}>
          Edit Profile
        </button>
      )}
      {showFollowButton && (
        <button className="follow-button">
          {user.is_following ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default Profile;
