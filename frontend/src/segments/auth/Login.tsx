import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Ylogo from "../../assets/Ylogo.jpg";
import "./Login.css";
import { AuthService } from "../../services/authService";
import { useUser } from "../../contexts/UserContext";

interface LoginProps {
  onLogin: () => void;
}

const Login:React.FC<LoginProps> = ({onLogin}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authService = AuthService.get_instance()
  const {refreshUser} = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.login(username, password);
      onLogin();
      refreshUser();
      navigate("/");
    } catch (err: any) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="logo-container">
          <img src={Ylogo} alt="Y Logo" className="logo" />
        </div>

        <h2 className="title">Log in to Y</h2>

        <form onSubmit={handleLogin}>
         <input
            type="text"
            placeholder="Username"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? <div className="spinner"></div> : "Log In"}
          </button>
        </form>

        <p className="signup-text">
          Don't have an account?{" "}
          <Link to="/register" className="signup-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
