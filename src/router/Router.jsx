import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "../user/registration/Registration"; 
import Login from "../user/login/Login";
import Mainpage from "../user/mainpage/Mainpage";
import Admin_Login from '../admin/pages/Admin_Login'
import Admin from '../admin/Admin'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mainpage" element={<Mainpage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin_login" element={<Admin_Login />} />


      </Routes>
    </BrowserRouter>
  );
};

export default Router;
