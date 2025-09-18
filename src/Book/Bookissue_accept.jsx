

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify';

export default function BookissueAccept() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null); // track action per request


  // Fetch all pending requests
  const fetchRequests = async () => {
    setLoading(true);
    toast.success('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${BACKEND_URL}/api/librarian/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data.requests || []);
    } catch (error) {
      console.error('Fetch error:', error.response || error);
      toast.error(error.response?.data?.message || 'Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  // Accept or Reject request
  const handleAction = async (id, status) => {
    setActionLoading(id);
    ('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `${BACKEND_URL}/api/librarian/requests/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      fetchRequests(); // refresh list
    } catch (error) {
      console.error('Action error:', error.response || error);
      toast.error(error.response?.data?.message || 'Action failed');
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans ml-64">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          📋 Book Issue Requests
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading requests...</p>
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-500">No pending requests</p>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-indigo-700">
                  {req.book?.title || 'Unknown Book'}
                </h3>
                <p className="text-sm text-gray-600">
                  Book ID: {req.book?._id || 'N/A'}
                </p>
                <p className="text-sm text-gray-600">
                  Student: {req.student?._id || 'N/A'}
                </p>
                <p className="text-sm text-gray-600">
                  Requested on: {new Date(req.requestedAt).toLocaleDateString()}
                </p>

                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => handleAction(req._id, 'approved')}
                    disabled={actionLoading === req._id}
                    className={`bg-green-500 text-white px-4 py-2 rounded-xl transition ${
                      actionLoading === req._id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
                    }`}
                  >
                    {actionLoading === req._id ? 'Processing...' : 'Accept'}
                  </button>
                  <button
                    onClick={() => handleAction(req._id, 'rejected')}
                    disabled={actionLoading === req._id}
                    className={`bg-red-500 text-white px-4 py-2 rounded-xl transition ${
                      actionLoading === req._id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
                    }`}
                  >
                    {actionLoading === req._id ? 'Processing...' : 'Reject'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* {message && (
          <p className="mt-6 text-center text-indigo-600 font-medium">{message}</p>
        )} */}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
