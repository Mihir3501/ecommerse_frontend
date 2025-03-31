import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "../user/registration/Registration"; 
import Login from "../user/login/Login";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
