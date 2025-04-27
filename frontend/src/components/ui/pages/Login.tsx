import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Ylogo from '../../assets/Ylogo.jpg';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/home');
    }, 1000);
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl p-10 w-96 shadow-xl">
        <div className="flex justify-center mb-6">
          <img src={Ylogo} alt="Y Logo" className="w-12 h-12 object-contain" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Log in to Y</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            required
          />
          <input
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
              'Log In'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
