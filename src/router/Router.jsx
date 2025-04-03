import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "../user/auth/registration/Registration"; 
import Login from "../user/auth/login/Login";
import Mainpage from "../user/pages/mainpage/Mainpage";
import Feedback from "../user/pages/feedback/Feedback";
import Admin_Login from "../admin/pages/Admin_Login"
import Selar_Registrastion from "../selar/registration/Selar_Registrastion";
import Selar_Login from "../selar/login/Selar_Login";
import Selar_Dashboard from"../selar/dashboard/Selar_Dashboard";
import Selar_Navbar from "../selar/dashboard/Selar_Navbar";
import Selar_Sidebar from "../selar/dashboard/Selar_Sidebar";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>

      {/* User route */} 
        <Route path="/" element={<Mainpage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mainpage" element={<Mainpage />} />
        <Route path="/feedback" element={<Feedback />} />
     {/* User end */} 

      {/* Admin route */}  
        <Route path="/admin" element={<Admin_Login />} />
      {/* Admin end */} 

      {/* Selar route */} 
        <Route path="/selar_Registrastion" element={<Selar_Registrastion/>}/>
        <Route path="/Selar_Login" element={<Selar_Login/>}/>
        <Route path="/Selar_Dashboard" element={<Selar_Dashboard/>}/>
        <Route path="/Selar_Navbar" element={<Selar_Navbar/>}/>
        <Route path="/Selar_Sidebar" element={<Selar_Sidebar/>}/>
      {/* Selar end */}

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
