// LibrarianLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Librarian_nav from "./Librarian_nav";

export default function LibrarianLayout() {
  return (
    <div className="flex">
      <Librarian_nav />
      <main className="ml-64 flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
