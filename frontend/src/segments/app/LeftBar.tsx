import { Home, Search, Bell, Bookmark, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import "./LeftBar.css";
import logo from "../../assets/Ylogo.jpg";
import { AuthService } from "../../services/authService";

function LeftBar() {
  const addPost = () => {
    alert("POST");
  };

  const authService = AuthService.get_instance();
  const currentUserId = authService.getUserId();

  return (
    <div className="leftbar">
      <img src={logo} alt="Logo" className="logo" />
      <div className="leftbar-links">
        <Link to="/" className="leftbar-link">
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link to="/explore" className="leftbar-link">
          <Search size={20} />
          <span>Explore</span>
        </Link>
        <Link to="/notifications" className="leftbar-link">
          <Bell size={20} />
          <span>Notifications</span>
        </Link>
        <Link to="/bookmarks" className="leftbar-link">
          <Bookmark size={20} />
          <span>Bookmarks</span>
        </Link>
        <Link to={`/profile/${currentUserId}`} className="leftbar-link">
          <User size={20} />
          <span>Profile</span>
        </Link>
        <Link to="/settings" className="leftbar-link">
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </div>
      <button className="post-button" onClick={addPost}>
        Post
      </button>
    </div>
  );
}

export default LeftBar;
