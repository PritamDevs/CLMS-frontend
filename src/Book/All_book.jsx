import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Student_nav from '../component/Student_nav';
import { ToastContainer,toast } from 'react-toastify';

export default function AllBooks() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState({ filterType: 'title', query: '' });
  const [loading, setLoading] = useState(false);


  const fetchBooks = async (params = {}) => {
    setLoading(true);
    try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get(`${BACKEND_URL}/api/book/all`, { params ,  headers: { Authorization: `Bearer ${token}`},});
        setBooks(response.data.books || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleRequest = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BACKEND_URL}/api/student/request-book`,
        { bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message || 'Request submitted');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Request failed');
    }
  };

  const handleSearchChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (search.filterType && search.query) {
      params[search.filterType] = search.query;
    }
    fetchBooks(params);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        
        {/* Student Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-indigo-700">📚 Browse Library Books</h1>
          <p className="text-gray-600 mt-2">Search and request books available in the library</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <div className="relative w-full md:w-2/3">
            <select
              name="filterType"
              value={search.filterType}
              onChange={handleSearchChange}
              className="absolute left-2 top-2 bottom-2 bg-white border-r border-gray-300 pr-2 pl-2 rounded-l-xl focus:outline-none"
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="category">Category</option>
            </select>

            <input
              type="text"
              name="query"
              value={search.query}
              onChange={handleSearchChange}
              placeholder={`Search by ${search.filterType}`}
              className="w-full pl-32 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </form>

        {/* Book List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading books...</p>
        ) : books.length === 0 ? (
          <p className="text-center text-gray-500">No books found</p>
        ) : (
          <ul className="space-y-4">
            {books.map((book) => (
              <li key={book._id} className="border rounded-xl p-4 shadow-sm bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-indigo-700">{book.title}</h2>
                    <p className="text-sm text-gray-600">Author: {book.author}</p>
                    <p className="text-sm text-gray-600">Category: {book.category}</p>
                    <p className="text-sm text-gray-600">ISBN: {book.isbn}</p>
                  </div>
                  <button
                    onClick={() => handleRequest(book._id)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
                  >
                    Request Book
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

