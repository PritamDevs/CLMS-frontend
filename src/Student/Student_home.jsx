import React from 'react';
// import { Link } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import Calendar from '../component/Calendar';
import Student_nav from '../component/Student_nav';

export default function Student_home() {
  
  
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar Navigation */}
      <div>
        <Student_nav  />
      </div>
      {/* <aside className="w-64 bg-white shadow-md fixed h-full z-40">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-indigo-700">Student Portal</h2>
        </div>
        <nav className="p-6 space-y-4">
          <Link to="" className="block text-gray-700 hover:text-indigo-700">Dashboard</Link>
          <Link to="/Book/All_book" className="block text-gray-700 hover:text-indigo-700">Book</Link>
          <Link to="/Book/Issue_Request" className="block text-gray-700 hover:text-indigo-700">Issue Book Request</Link>
          <Link to="/Book/Borrowed_Books" className="block text-gray-700 hover:text-indigo-700">Borrowed Books</Link>
          <Link to="/Book/Return" className="block text-gray-700 hover:text-indigo-700"> Book Return</Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        </nav>
      </aside> */}

      {/* Main Content */}
      <main className="ml-64 w-full">
        {/* Top Bar with Profile Icon */}
        <div className="flex justify-end items-center p-6 bg-white shadow">
          <Link to="/Student/Profile" className="flex items-center space-x-2 hover:text-indigo-700">
            {/* Profile Icon */}
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, Student 👋</h1>
          <p className="text-gray-600 mb-8">Manage your library activity and explore resources.</p>

          <section className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-md text-center">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">Borrowed Books</h3>
              <p className="text-gray-600">View and manage your current loans.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md text-center">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">Due Dates</h3>
              <p className="text-gray-600">Keep track of upcoming return deadlines.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md text-center">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">Digital Resources</h3>
              <p className="text-gray-600">Access e-books and academic materials anytime.</p>
            </div>
          </section>
        </div>
      </main>
      <Calendar />
    </div>
  );
}