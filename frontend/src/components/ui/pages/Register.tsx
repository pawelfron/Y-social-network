import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Ylogo from '../../assets/Ylogo.jpg';

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

      //fter 2 seconds, redirect to /home
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={Ylogo} alt="Y Logo" className="w-16 h-16 object-contain" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">Create your account</h2>

        {success ? (
          
          <div className="text-green-600 text-center font-semibold mb-4">
            🎉 Account created successfully!
          </div>
        ) : (
          
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition flex items-center justify-center"
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
          <p className="mt-4 text-center text-sm">
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
