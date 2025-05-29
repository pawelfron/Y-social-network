import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Ylogo from './../../../assets/Ylogo.jpg';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        localStorage.setItem("token", data.token);
        setTimeout(() => navigate("/home"), 2000);
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      alert("Network error or server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl p-10 w-96 shadow-xl">
        <div className="flex justify-center mb-6">
          <img src={Ylogo} alt="Y Logo" className="w-12 h-12 object-contain" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Create your account</h2>

        {success ? (
          <div className="text-green-600 text-center font-semibold mb-4">
            🎉 Account created successfully!
          </div>
        ) : (
          <form onSubmit={handleRegister}>
            <input
              id="name"
              type="text"
              placeholder="Name"
              className="w-full p-3 mb-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
              required
            />
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
              required
            />
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-6 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition flex justify-center items-center text-lg font-semibold"
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>
        )}

        {!success && (
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
