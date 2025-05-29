import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Ylogo from "../../assets/Ylogo.jpg";
import "./Register.css";
import { AuthService } from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authService = AuthService.get_instance()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null)

    try {
      await authService.register(username, email, password);
      await authService.login(username, password);
      navigate('/');
      //const userId = authService.getUserId();
      //userService.editUser(userId, )
    } catch (err: any) {
      setError("Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <div className="logo-container">
          <img src={Ylogo} alt="Y Logo" className="logo" />
        </div>

        <h2 className="title">Create your account</h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            className="input-field"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? <div className="spinner"></div> : "Sign Up"}
          </button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/" className="login-link">
            Log in
          </Link>
        </p>
        
      </div>
    </div>
  );
};

export default Register;
