import React, { useEffect, useState } from "react";
import Student_nav from "../component/Student_nav";

export default function Student_profile() {
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed=JSON.parse(userData);
      setStudent(parsed);
      setFormData(parsed);
    }
  }, []);

  const handleSave = () => {
    setStudent(formData);
    localStorage.setItem("user", JSON.stringify(formData));
    setIsEditing(false);
  };

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
  <div className="flex">
    <Student_nav />
    <div className="flex-1 ml-64 min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-indigo-100 py-8 px-6 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-indigo-400 text-white text-5xl flex items-center justify-center shadow-md">
            🎓
          </div>
          <h2 className="mt-4 text-xl font-semibold text-indigo-800">
            {student.name || "Student"}
          </h2>
          <p className="text-gray-700">{student.course }</p>
          <p className="text-gray-600">{student.address || "India"}</p>
        </div>

        {/* Profile Info Section */}
        <div className="px-6 py-6 space-y-4 text-gray-700">
          <h3 className="text-lg font-semibold text-gray-800">
            Profile Information
          </h3>
          <div>
            <span className="font-medium">Full Name:</span> {student.name}
          </div>
          <div>
            <span className="font-medium">Email:</span> {student.email}
          </div>
          <div>
            <span className="font-medium">Phone:</span>{" "}
            {student.phone || "N/A"}
          </div>
          <div>
            <span className="font-medium">Address:</span>{" "}
            {student.address || "Not Provided"}
          </div>

          {/* Edit Button */}
          <div className="pt-4 text-center">
            <button onClick={()=>setIsEditing(true)}className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600 transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
  </div>
      {isEditing && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h3 className="text-lg font-bold mb-4">Edit Profile</h3>

      {/* Full Name */}
      <input
        type="text"
        value={formData.name || ""}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Full Name"
        className="w-full mb-3 px-3 py-2 border rounded"
      />

      {/* Email */}
      <input
        type="email"
        value={formData.email || ""}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
        className="w-full mb-3 px-3 py-2 border rounded"
      />

      {/* Phone */}
      <input
        type="text"
        value={formData.phone || ""}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        placeholder="Phone"
        className="w-full mb-3 px-3 py-2 border rounded"
      />

      {/* Address */}
      <input
        type="text"
        value={formData.address || ""}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        placeholder="Address"
        className="w-full mb-3 px-3 py-2 border rounded"
      />

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setIsEditing(false)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}
</div>
  );
}
