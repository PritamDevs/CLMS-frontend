
// import React, { useEffect, useState } from "react";

// export default function BorrowedBooks() {
//   const [activeTab, setActiveTab] = useState("requested");
//   const [requestedBooks, setRequestedBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchRequests = async () => {
//     try {
//       const res = await fetch("http://localhost:5505/api/student/my-requests", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`
//         }
//       });
//       const data = await res.json();
//       if (data.success) {
//         setRequestedBooks(data.requests);
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReturnRequest = async (requestId) => {
//     try {
//       const res = await fetch(`http://localhost:5505/api/student/request-return/${requestId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`
//         },
//         // body: JSON.stringify({ requestId })
//       });
//       const data = await res.json();
//       alert(data.message);
//       fetchRequests(); // refresh after action
//     } catch (err) {
//       console.log("Return error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const issuedBooks = requestedBooks.filter(r => r.status === "approved");
//   const pendingBooks = requestedBooks.filter(r => r.status !== "approved");

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 font-sans">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
//         <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">📚 My Borrowed Books</h2>

//         {/* Tabs */}
//         <div className="flex justify-center mb-6 space-x-4">
//           <button
//             onClick={() => setActiveTab("requested")}
//             className={`px-4 py-2 rounded-xl font-medium ${
//               activeTab === "requested" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             Requested Books
//           </button>
//           <button
//             onClick={() => setActiveTab("issued")}
//             className={`px-4 py-2 rounded-xl font-medium ${
//               activeTab === "issued" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             Issued Books
//           </button>
//         </div>

//         {/* Book Cards */}
//         <div className="space-y-4">
//           {loading ? (
//             <p className="text-center text-gray-500">Loading...</p>
//           ) : activeTab === "requested" ? (
//             pendingBooks.map((book, index) => (
//               <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
//                 <h3 className="text-lg font-semibold text-indigo-700">{book.book.title}</h3>
//                 <p className="text-sm text-gray-600">Author: {book.book.author}</p>
//                 <p className="text-sm text-gray-600">Requested on: {book.createdAt.slice(0, 10)}</p>
//                 <span
//                   className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
//                     book.status === "approved" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
//                   }`}
//                 >
//                   {book.status}
//                 </span>
//               </div>
//             ))
//           ) : (
//             issuedBooks.map((book, index) => (
//               <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
//                 <h3 className="text-lg font-semibold text-indigo-700">{book.book.title}</h3>
//                 <p className="text-sm text-gray-600">Author: {book.book.author}</p>
//                 <p className="text-sm text-gray-600">Issued on: {book.approvedAt?.slice(0, 10)}</p>
//                 <p className="text-sm text-gray-600">Return by: {book.returnDate?.slice(0, 10)}</p>

//                 <div className="mt-4 text-right">
//                   <button
//                     disabled={book.status === "return_requested"}
//                     onClick={() => handleReturnRequest(book._id)}
//                     className={`px-4 py-2 rounded-xl transition ${
//                       book.status === "return_requested"
//                         ? "bg-gray-400 text-white cursor-not-allowed"
//                         : "bg-red-500 text-white hover:bg-red-600"
//                     }`}
//                   >
//                     {book.status === "return_requested" ? "Return Requested" : "Return Book"}
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import Student_nav from "../component/Student_nav";
import { BACKEND_URL } from "../config";

export default function BorrowedBooks() {
  const [activeTab, setActiveTab] = useState("requested");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login as a student.");

      const res = await fetch(`${BACKEND_URL}/api/student/my-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setRequests(data.requests || []);
      } else {
        setRequests([]);
        setError(data.message || "Failed to fetch requests.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleReturnRequest = async (requestId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found.");

      const res = await fetch(`${BACKEND_URL}/api/student/request-return`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ requestId }),
      });

      const data = await res.json();
      alert(data.message);
      fetchRequests(); // refresh after return request
    } catch (err) {
      console.error("Return error:", err);
      alert(err.message || "Failed to request return.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const requestedBooks = requests.filter(r => r.status === "pending");
  const issuedBooks = requests.filter(r => r.status === "approved" || r.status === "return_requested");

  return (
  <div className="flex">
    <Student_nav />
    <div className="flex-1 ml-64 min-h-screen bg-gray-100 p-6 font-sans">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          📚 My Borrowed Books
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setActiveTab("requested")}
            className={`px-4 py-2 rounded-xl font-medium ${
              activeTab === "requested" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Requested Books
          </button>
          <button
            onClick={() => setActiveTab("issued")}
            className={`px-4 py-2 rounded-xl font-medium ${
              activeTab === "issued" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Issued Books
          </button>
        </div>

        {/* Loading / Error */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (activeTab === "requested" ? requestedBooks : issuedBooks).length === 0 ? (
          <p className="text-center text-gray-500">No books found.</p>
        ) : (
          <div className="space-y-4">
            {(activeTab === "requested" ? requestedBooks : issuedBooks).map((r) => (
              <div key={r._id} className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-indigo-700">
                  {r.book?.title || "Unknown Book"}
                </h3>
                <p className="text-sm text-gray-600">Author: {r.book?.author || "Unknown"}</p>
                <p className="text-sm text-gray-600">
                  {activeTab === "requested"
                    ? `Requested on: ${new Date(r.requestedAt).toLocaleDateString()}`
                    : `Issued on: ${r.respondedAt ? new Date(r.respondedAt).toLocaleDateString() : "N/A"}`}
                </p>

                {/* Return button */}
                {activeTab === "issued" && (
                  <div className="mt-4 text-right">
                    <button
                      disabled={r.status === "return_requested"}
                      onClick={() => handleReturnRequest(r._id)}
                      className={`px-4 py-2 rounded-xl transition ${
                        r.status === "return_requested"
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      {r.status === "return_requested" ? "Return Requested" : "Return Book"}
                    </button>
                  </div>
                )}

                {/* Status Badge */}
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                    r.status === "approved"
                      ? "bg-green-200 text-green-800"
                      : r.status === "return_requested"
                      ? "bg-purple-200 text-purple-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
  );
}
