import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BACKEND_URL } from '../config/index';
import axios from 'axios'
import Loading from '../component/Loading';
import { useState } from 'react';

function Librarian_login({ setIsLogin, setRole }) {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/librarian/login`, { email, password })
      const { success, message, librarian, token } = data;

      if (success && librarian && token) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', 'librarian');
        localStorage.setItem('user', JSON.stringify({ ...librarian, role: 'librarian' }));

        toast.success(message || "Login successful")

        setIsLogin(true);
        if (setRole) setRole("librarian")
        navigate('/Librarian/Home');
      } else {
        toast.error(message || "Login failed")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-200 p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login As Librarian</h2>

          <form onSubmit={handleLogin} className="space-y-4">

            <div>
              <label className="block text-sm font-semibold text-gray-700">Enter Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>


            <div>
              <label className="block text-sm font-semibold text-gray-700">Enter Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            Don’t have an account? <Link to="/Librarian/Register" className="text-blue-600 hover:underline">Register here</Link>
          </p>
        </div>
      </div>


      <div className="md:w-1/2 w-full hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxpYnJhcnl8ZW58MHx8MHx8fDA%3D"
          alt="https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D"
          className="w-full h-screen object-cover"
        />
      </div>
      {loading && <Loading />}
    </div>
  );
}
export default Librarian_login