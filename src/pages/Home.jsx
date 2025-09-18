import React, { useState } from 'react';
import { Link } from 'react-router';

export default function Home() {
    const [signInOpen, setSignInOpen] = useState(false);
    const [signUpOpen, setSignUpOpen] = useState(false);

    return (
        <div className="bg-gray-50 font-sans min-h-screen">
            {/* Navbar */}
            <header className="bg-white shadow-md fixed w-full top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-indigo-700">College Library</h1>
                    <nav className="space-x-6 hidden md:flex">
                        <a href="#" className="text-gray-700 hover:text-indigo-700">Home</a>
                        <a href="#" className="text-gray-700 hover:text-indigo-700">Catalog</a>
                        <a href="#" className="text-gray-700 hover:text-indigo-700">Resources</a>
                        <a href="#" className="text-gray-700 hover:text-indigo-700">Contact</a>
                    </nav>
                    <div className="space-x-4">
                        <button
                            onClick={() => setSignInOpen(true)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setSignUpOpen(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative bg-indigo-100 pt-28 pb-20 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Your College Library</h2>
                <p className="text-lg text-gray-600 mb-6">
                    Explore, borrow, and manage books with ease. Empower your learning journey.
                </p>
                <a
                    href="#"
                    className="px-6 py-3 bg-indigo-600 text-white text-lg rounded-lg shadow hover:bg-indigo-700"
                >
                    Browse Catalog
                </a>
            </section>

            {/* Features */}
            <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
                <div className="p-6 bg-white rounded-xl shadow-md text-center">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-2">Digital Catalog</h3>
                    <p className="text-gray-600">
                        Search and reserve books online from a wide range of academic resources.
                    </p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-md text-center">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-2">Student Dashboard</h3>
                    <p className="text-gray-600">
                        Track borrowed books, due dates, and manage your library account effortlessly.
                    </p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-md text-center">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-2">24/7 Access</h3>
                    <p className="text-gray-600">
                        Access digital materials and e-books anytime, anywhere from your student portal.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 text-center">
                <p>&copy; 2025 College Library System. All rights reserved.</p>
            </footer>

            {/* Sign In Modal */}
            {signInOpen && (
                <div
                    onClick={() => setSignInOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-xl p-8 max-w-sm w-full shadow-lg relative"
                    >
                        <button
                            onClick={() => setSignInOpen(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                        >
                            ✖
                        </button>
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In As</h3>
                        <div className="space-y-4">
                            <Link
                               to="/Student/Login"
                                className="block w-full text-center px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                            >
                                Student
                            </Link>
                            <Link
                                to="/Librarian/Login"
                                className="block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Librarian
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Sign Up Modal */}
            {signUpOpen && (
                <div
                    onClick={() => setSignUpOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-xl p-8 max-w-sm w-full shadow-lg relative"
                    >
                        <button
                            onClick={() => setSignUpOpen(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                        >
                            ✖
                        </button>
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up As</h3>
                        <div className="space-y-4">
                            <Link
                                to="/Student/Register"
                                className="block w-full text-center px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                            >
                                Student
                            </Link>
                            <Link
                                to="/Librarian/Register"
                                className="block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Librarian
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}