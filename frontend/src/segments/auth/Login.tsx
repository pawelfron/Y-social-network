import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Ylogo from "../../assets/Ylogo.jpg";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/home");
    }, 1000);
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
            type="email"
            placeholder="Email"
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            required
          />
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
