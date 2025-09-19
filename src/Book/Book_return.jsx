
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Student_nav from "../component/Student_nav";
import { BACKEND_URL } from '../config';

export default function ReturnedBooksPage() {
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReturnedBooks = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/issue/returned`); // Adjust path if needed
        setReturnedBooks(res.data.books || []);
      } catch (err) {
        console.error("Error fetching returned books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReturnedBooks();
  }, []);


const handleReturnRequest = async (requestId) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/issue/request-return`, { requestId });
    alert(res.data.message); // Or use toast notification
  } catch (err) {
    console.error("Return request failed:", err);
    alert(err.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
       <Student_nav />
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">📦 Returned Books</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading returned books...</p>
        ) : returnedBooks.length === 0 ? (
          <p className="text-center text-gray-500">No returned books found.</p>
        ) : (
          <div className="space-y-4">
            {returnedBooks.map((book, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-indigo-700">{book.title}</h3>
                <p className="text-sm text-gray-600">Author: {book.author}</p>
                <p className="text-sm text-gray-600">Issued on: {book.issueDate}</p>
                <p className="text-sm text-gray-600">Due by: {book.returnDate}</p>
                <p className="text-sm text-gray-600">Returned on: {book.returnedOn}</p>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                    book.status === "On Time"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {book.status}
                </span>
                <button onClick={() => handleReturnRequest(book.requestId)}className="mt-2 px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">Request Return</button>

                <span  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${ book.status === "returned"? "bg-green-200 text-green-800": book.status === "return_requested" ? "bg-yellow-200 text-yellow-800": "bg-red-200 text-red-800"}`}>{book.status}
                </span>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}