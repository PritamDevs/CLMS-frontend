

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from '../component/Loading';
import { BACKEND_URL } from '../config';
import { useAuth } from '../context/AuthContext';

function Student_Login() {
  const navigate = useNavigate();
  const { login } = useAuth();   
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page reload
    setLoading(true);

    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/student/login`, { email, password });
      const { success, message, student, token } = data;

      if (success && student && token) {
        login(token, 'student', student);
        // localStorage.setItem('token', token);
        // localStorage.setItem('role', 'student');
        // localStorage.setItem('user', JSON.stringify({ ...student, role: 'student' }));

        toast.success(message || 'Login successful');

        // setIsLogin(true);
        // if (setRole) setRole('student');
        navigate('/Student/Home');
      } else {
        toast.error(message || 'Login failed');
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Form Section */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-200 p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login as Student</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Enter Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="off"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Enter Password</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 font-semibold rounded-md transition duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to="/Student/Register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="md:w-1/2 w-full hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxpYnJhcnl8ZW58MHx8MHx8fDA%3D"
          alt="Student Login"
          className="w-full h-screen object-cover"
        />
      </div>
      {loading && <Loading />}
    </div>
  );
}

export default Student_Login;
