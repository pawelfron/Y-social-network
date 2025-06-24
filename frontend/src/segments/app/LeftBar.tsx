import { Home, Search, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import "./LeftBar.css";
import logo from "../../assets/Ylogo.jpg";
import { AuthService } from "../../services/authService";
import CreatePost from "../../components/Post/CreatePost";
import { useState } from "react";
import { Menu } from "lucide-react";


interface ProfileProps {
  onOpenModal: (content: React.ReactNode) => void;
}


const LeftBar : React.FC<ProfileProps> = ({ onOpenModal })=> {
  const addPost = () => {
    onOpenModal(<CreatePost></CreatePost>)
  };

  const authService = AuthService.get_instance();
  const currentUserId = authService.getUserId();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="leftbar">
      <img src={logo} alt="Logo" className="logo" />

     
      <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
          <Menu size={40} />
      </button>

      <div className={`leftbar-links ${isMobileMenuOpen ? "open" : ""}`}>
        <Link to="/" className="leftbar-link" onClick={() => setIsMobileMenuOpen(false)}>
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link to="/explore" className="leftbar-link" onClick={() => setIsMobileMenuOpen(false)}>
          <Search size={20} />
          <span>Explore</span>
        </Link>
        <Link to={`/profile/${currentUserId}`} className="leftbar-link" onClick={() => setIsMobileMenuOpen(false)}>
          <User size={20} />
          <span>Profile</span>
        </Link>
        <Link to="/settings" className="leftbar-link" onClick={() => setIsMobileMenuOpen(false)}>
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
