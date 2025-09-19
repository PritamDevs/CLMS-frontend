// import React, { useState } from 'react';

// const initialStudents = [
//   { studentId: "S2025", name: "Khushi Sharma", email: "khushi@example.com", status: "Active" },
//   { studentId: "S2026", name: "Amit Roy", email: "amit@example.com", status: "Active" },
//   { studentId: "S2027", name: "Neha Das", email: "neha@example.com", status: "Suspended" },
// ];

// export default function StudentManagementPage() {
//   const [students, setStudents] = useState(initialStudents);
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSuspend = (studentId) => {
//     setStudents(prev =>
//       prev.map(student =>
//         student.studentId === studentId
//           ? { ...student, status: "Suspended" }
//           : student
//       )
//     );
//     console.log(`Student ${studentId} suspended`);
//   };

//   const filteredStudents = students.filter(student =>
//     student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
//   );

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Loading from '../component/Loading';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../config';

export default function StudentManagementPage() {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BACKEND_URL}/api/student/students/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to fetch students");
        }
        const data = await res.json();
        console.log("Fetched students:", data);
        setStudents(data.students||[]);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchStudents();
  }, [token]);

  // Suspend student
  const handleSuspend = async (studentId) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/librarian/students/suspend/${studentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ reason: "Suspended by librarian" })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to suspend student");
      }

      const data = await res.json();
      setStudents(prev =>
        prev.map(s => s._id === studentId ? { ...s, isSuspended: true } : s)
      );
      toast.success(data.message);
    } catch (err) {
      console.error("Error suspending student:", err);
      toast.error(err.message);
    }
  };

  // Filtered search
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 ml-64 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">👥 Manage Students</h2>

        {/* Search Box */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-red-500 font-medium text-center">
            {error}
          </div>
        )}

        {/* Student Table */}
        {loading ? (
          <Loading />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300 rounded-xl">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student._id} className="border-t border-gray-200">
                      <td className="px-4 py-3 text-sm text-gray-800">{student._id}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{student.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{student.email}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            student.isSuspended
                              ? "bg-red-200 text-red-800"
                              : "bg-green-200 text-green-800"
                          }`}
                        >
                          {student.isSuspended ? "Suspended" : "Active"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {!student.isSuspended ? (
                          <button
                            onClick={() => handleSuspend(student._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                          >
                            Suspend
                          </button>
                        ) : (
                          <span className="text-gray-400 text-sm italic">Already Suspended</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                      No matching students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
