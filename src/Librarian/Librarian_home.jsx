import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Calendar from '../component/Calendar';

export default function Librarian_home({setIsLogin, setRole}) {
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
  };
    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            {/* Sidebar Navigation */}
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

            {/* Main Content */}
            <main className="ml-64 w-full">
                <div className="flex justify-end items-center p-6 bg-white shadow">
                    <Link to="/Librarian/Profile" className="flex items-center space-x-2 hover:text-indigo-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-700"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
                            />
                        </svg>
                        <span className="text-gray-700 font-medium">Profile</span>
                    </Link>
                </div>

                {/* Dashboard Content */}
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, Librarian 📚</h1>
                    <p className="text-gray-600 mb-8">Oversee library operations and student engagement.</p>

                    <section className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded-xl shadow-md text-center">
                            <h3 className="text-xl font-semibold text-indigo-700 mb-2">Book Inventory</h3>
                            <p className="text-gray-600">Add, update, or remove books from the catalog.</p>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow-md text-center">
                            <h3 className="text-xl font-semibold text-indigo-700 mb-2">Borrow Requests</h3>
                            <p className="text-gray-600">Approve or reject student borrow requests.</p>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow-md text-center">
                            <h3 className="text-xl font-semibold text-indigo-700 mb-2">Student Records</h3>
                            <p className="text-gray-600">Track borrowing history and manage student accounts.</p>
                        </div>
                    </section>
                </div>
            </main>

            {/* Real-Time Calendar */}
            <Calendar />
        </div>
    );
}