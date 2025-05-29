import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Ylogo from "./../../../assets/Ylogo.jpg";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    }, 1000);
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <div className="logo-container">
          <img src={Ylogo} alt="Y Logo" className="logo" />
        </div>

        <h2 className="title">Create your account</h2>

        {success ? (
          <div className="success-message">
            🎉 Account created successfully!
          </div>
        ) : (
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Name"
              className="input-field"
              required
            />
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
              {loading ? <div className="spinner"></div> : "Sign Up"}
            </button>
          </form>
        )}

        {!success && (
          <p className="login-text">
            Already have an account?{" "}
            <Link to="/" className="login-link">
              Log in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
