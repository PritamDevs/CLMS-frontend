import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Librarian_nav({ setIsLogin, setRole }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Reset state (so App knows user is logged out)
    if (setIsLogin) setIsLogin(false);
    if (setRole) setRole("");

    // Redirect to login page
    navigate("/Librarian/Login");
  }
  return (
    <div>
        <aside className="w-64 bg-white shadow-md fixed h-full z-40">
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-bold text-indigo-700">Librarian Panel</h2>
                </div>
                <nav className="p-6 space-y-4">
                    <Link to="/Librarian/Home" className="block text-gray-700 hover:text-indigo-700">Dashboard</Link>
                    <Link to="/Librarian/Librarian_book" className="block text-gray-700 hover:text-indigo-700">Manage Books</Link>
                    <Link to="/Librarian/Requests" className="block text-gray-700 hover:text-indigo-700">Borrow Requests</Link>
                    <Link to="/Librarian/Return_requests" className="block text-gray-700 hover:text-indigo-700">Return Requests</Link>
                    <Link to="/Librarian/students" className="block text-gray-700 hover:text-indigo-700">Student Records</Link>
                    {/* <Link to="/logout" className="block text-red-600 hover:text-red-800">Logout</Link> */}
                     <button onClick={handleLogout} className="block w-full text-left text-red-600 hover:text-red-800">
                    Logout
                  </button>
                </nav>
            </aside>
    </div>
  )
}
export default Librarian_nav
