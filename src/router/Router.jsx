import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "../user/auth/registration/Registration"; 
import Login from "../user/auth/login/Login";
import Mainpage from "../user/pages/mainpage/Mainpage";
import Feedback from "../user/pages/feedback/Feedback";
import Admin_Login from "../admin/pages/Admin_Login";
import Admin from "../admin/Admin"
import Selar_Registrastion from "../selar/registration/Selar_Registrastion";
import Selar_Login from "../selar/login/Selar_Login";
import Selar_Dashboard from "../selar/dashboard/Selar_Dashboard";
import Selar_Navbar from "../selar/dashboard/Selar_Navbar";
import Selar_Sidebar from "../selar/dashboard/Selar_Sidebar";
 
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
 
        {/* User routes */} 
        <Route path="/" element={<Mainpage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mainpage" element={<Mainpage />} />
        <Route path="/feedback" element={<Feedback />} />
        {/* User routes end */}
 
        {/* Admin route */}  
        <Route path="/admin_login" element={<Admin_Login />} />
        <Route path="/admin" element={<Admin />} />
        {/* Admin route end */}
 
        {/* Selar routes */} 
        <Route path="/selar_registration" element={<Selar_Registrastion />} />
        <Route path="/selar_login" element={<Selar_Login />} />
        <Route path="/selar_dashboard" element={<Selar_Dashboard />} />
        <Route path="/selar_navbar" element={<Selar_Navbar />} />
        <Route path="/selar_sidebar" element={<Selar_Sidebar />} />
        {/* Selar routes end */}
 
      </Routes>
    </BrowserRouter>
  );
};
 
export default Router;
 
