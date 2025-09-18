

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Return_requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchReturnRequests = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/librarian/requests?status=return_requested`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRequests(res.data.requests || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch return requests.");
      } finally {
        setLoading(false);
      }
    };
    fetchReturnRequests();
  }, [token]);

  const handleApprove = async (id) => {
    try {
      await axios.put(
        `${BACKEND_URL}/librarian/requests/${id}`,
        { status: "returned" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests(requests.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to approve request.");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(
        `${BACKEND_URL}/api/librarian/requests/${id}`,
        { status: "rejected", rejectionReason: "Return not accepted" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests(requests.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to reject request.");
    }
  };

  if (loading) return <p className="p-6">Loading return requests...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (requests.length === 0) return <p className="p-6">No pending return requests.</p>;

  return (
    <div className="p-6 ml-64">
      <h1 className="text-2xl font-bold mb-4">Return Requests</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-indigo-700 text-white">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold">Student Name</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">Book Title</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">Requested At</th>
            <th className="py-3 px-4 text-center text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 text-sm text-gray-800 align-middle">{req.student?.name || "N/A"}</td>
              <td className="py-3 px-4 text-sm text-gray-800 align-middle">{req.book?.title || "N/A"}</td>
              <td className="py-3 px-4 text-sm text-gray-800 align-middle whitespace-nowrap">
                {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : "N/A"}
              </td>
              <td className="py-3 px-4 text-center align-middle whitespace-nowrap">
                <div className="flex justify-center items-center gap-2">
                <button
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 mr-2"
                  onClick={() => handleApprove(req._id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  onClick={() => handleReject(req._id)}
                >
                  Reject
                </button>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
