
import React, { useState } from 'react';
import axios from 'axios';
import Student_nav from '../component/Student_nav';
import { BACKEND_URL } from '../config';

export default function BookIssueRequest() {
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    bookTitle: '',
    bookId: '',
    requestDate: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${BACKEND_URL}/api/student/request-book`,
        { bookId: formData.bookId }, // backend only needs bookId
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message || 'Request submitted successfully');
      setFormData({
        studentName: '',
        studentId: '',
        bookTitle: '',
        bookId: '',
        requestDate: '',
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="flex">
    <Student_nav/>
    <div className="flex-1 ml-64 min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-indigo-700">📥 Issue Book Request</h1>
          <p className="text-gray-600 mt-2">Fill in the details to request a book from the library</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Student Name</label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Student ID</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Book Title</label>
            <input
              type="text"
              name="bookTitle"
              value={formData.bookTitle}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Book ID</label>
            <input
              type="text"
              name="bookId"
              value={formData.bookId}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Request Date</label>
            <input
              type="date"
              name="requestDate"
              value={formData.requestDate}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`bg-indigo-600 text-white px-6 py-3 rounded-xl transition ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
              }`}
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>

          {message && (
            <div className="text-center mt-4 text-sm text-indigo-600 font-medium">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  </div>
  );
}