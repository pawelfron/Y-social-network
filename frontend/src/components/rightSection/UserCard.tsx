import React, { useEffect, useState } from 'react';
import './UserCard.css';
import defaultProfile from '../../assets/default-avatar.jpg';
import { UserSummary } from '../../interfaces/user.ts';
import { UserService } from '../../services/userService.ts';
import { AuthService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const UserCard = (user: UserSummary) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const authService = AuthService.get_instance();
  const currentUser = authService.getUserId();

  useEffect(() => {
  const checkIfFollowing = async () => {
    const following = await UserService.getFollowing(currentUser!);
    const isFollowing = following.some(u => u.user.id === user.id);
    setIsFollowing(isFollowing);
  };

  checkIfFollowing();
}, []);


  const handleFollowToggle = async () => {
    setLoading(true);
    try {
      if (isFollowing) {
        await UserService.unfollowUser(user.id);
        setIsFollowing(false);
      } else {
        await UserService.followUser(user.id);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Follow/unfollow failed', error);
    } finally {
      setLoading(false);
    }
  };

  const showUserProfile = () => {
    navigate(`/profile/${user.id}`);
  }

  return (
    <div className='cardWrapper'>
      <img src={user.profile_photo || defaultProfile} alt="Profile" onClick={showUserProfile}/>
      <div className='namesWrapper'>
        <div>{user.username}</div>
      </div>
      <button onClick={handleFollowToggle} disabled={loading}>
        {loading ? "..." : isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default UserCard;
