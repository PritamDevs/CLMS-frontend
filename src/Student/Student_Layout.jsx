
import React from "react";
import { Outlet } from "react-router-dom";
import Student_nav from "./Student_nav";

export default function StudentLayout() {
  return (
    <div className="flex">
      {/* Sidebar/Navbar */}
      <Student_nav />

      {/* Page Content */}
      <main className="ml-64 flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
