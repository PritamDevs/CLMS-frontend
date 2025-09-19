
import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import { BACKEND_URL } from './config/index';

import Student_Login from './Student/Student_Login'
import Student_Register from './Student/Student_Register'
// import Student_nav from './component/Student_nav';
import Student_home from './Student/Student_home'
import Student_profile from './Student/Student_profile'
import All_book from './Book/All_book'

import Librarian_login from './Librarian/Librarian_login'
import Librarian_register from './Librarian/Librarian_register'
import Librarian_profile from './Librarian/Librarian.profile'
import Librarian_home from './Librarian/Librarian_home'
import LibrarianManage_Student from './Librarian/LibrarianManage_Student'
import Librarian_book from './Librarian/Librarian_book'


import Bookissue_request from './Book/Bookissue_request'
import Borrowed_books from './Book/Borrowed_books'
import Book_return from './Book/Book_return'
import Bookissue_accept from './Book/Bookissue_accept'
import Return_requests from './Book/Return_requests'

import Home from './pages/Home'
import axios from 'axios';
import Loading from './component/Loading';


function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(true)

  const handleRefresh = async () => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (!token || !storedRole) {
      setLoading(false);
      setRole('');
      return;
    }
    try {

      const decoded = jwtDecode(token);
      console.log("Decoded JWT:", decoded);
      if (decoded.exp * 1000 < Date.now()) {
        throw new Error("Token expired");
      }
      let url = "";
      if (storedRole === "student") {
        url = `${BACKEND_URL}/api/student/profile`;
      } else if (storedRole === "librarian") {
        url = `${BACKEND_URL}/api/librarian/profile/`;
      }

      if (url) {

        await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsLogin(true);
        setRole(storedRole);

      }
    } catch (error) {
      console.error("Auth refresh failed:", error.message);

      setIsLogin(false);
      setRole("");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleRefresh()
  }, []);

  if (loading) {
    return <Loading />;
  }


  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/Student/Login' element={<Student_Login setIsLogin={setIsLogin} setRole={setRole} />} />
        <Route path='/Student/Register' element={<Student_Register />} />
        <Route path='/Librarian/Login' element={<Librarian_login setIsLogin={setIsLogin} setRole={setRole} />} />
        <Route path='/Librarian/Register' element={<Librarian_register />} />

        {/* Student Routes */}
        <Route
          path='/Student/Home'
          element={
            isLogin && role === 'student' ? (
              <Student_home setIsLogin={setIsLogin} setRole={setRole} />
            ) : (
              <Navigate to='/Student/Login' replace />
            )
          }
        />
        <Route
          path='/Student/Profile'
          element={
            isLogin && role === 'student' ? (
              <Student_profile />
            ) : (
              <Navigate to='/Student/Login' replace />
            )
          }
        />

        {/* Librarian Routes */}
        <Route
          path='/Librarian/Home'
          element={
            isLogin && role === 'librarian' ? (
              <Librarian_home setIsLogin={setIsLogin} setRole={setRole} />
            ) : (
              <Navigate to='/Librarian/Login' replace />
            )
          }
        />
        <Route
          path='/Librarian/Profile'
          element={
            isLogin && role === 'librarian' ? (
              <Librarian_profile />
            ) : (
              <Navigate to='/Librarian/Login' replace />
            )
          }
        />
        <Route
          path='/Librarian/Students'
          element={
            isLogin && role === 'librarian' ? (
              <LibrarianManage_Student />
            ) : (
              <Navigate to='/Librarian/Login' replace />
            )
          }
        />
        <Route
          path='/Librarian/Librarian_book'
          element={
            isLogin && role === 'librarian' ? <Librarian_book /> : <Navigate to='/Librarian/Login' replace />
          }
        />


        {/* Book Routes (only allow if logged in) */}
        <Route
          path='/Book/All_book'
          element={
            isLogin ? <All_book /> : <Navigate to='/' replace />
          }
        />
        <Route
          path='/Book/Issue_Request'
          element={
            isLogin ? <Bookissue_request /> : <Navigate to='/' replace />
          }
        />
        <Route
          path='/Book/Borrowed_Books'
          element={
            isLogin ? <Borrowed_books /> : <Navigate to='/' replace />
          }
        />
        <Route
          path='/Book/Return'
          element={
            isLogin ? <Book_return /> : <Navigate to='/' replace />
          }
        />

        <Route
          path='/Librarian/Requests'
          element={
            isLogin && role === 'librarian' ? <Bookissue_accept /> : <Navigate to='/Librarian/Login' replace />
          }
        />
        <Route
         path='/Librarian/Return_requests'
         element={
         isLogin && role === 'librarian' ? <Return_requests /> : <Navigate to='/Librarian/Login' replace />
        }
        />



        {/* <Route 
        path='/Librarian/Librarian_book'
        element={
          isLogin && role === 'librarian' ? <Librarian_book /> : <Navigate to='/Librarian/Login' replace />
        }
      />  */}
      </Routes>
    </>

  )
}

export default App
