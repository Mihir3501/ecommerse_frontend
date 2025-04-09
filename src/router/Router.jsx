import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "../user/auth/registration/Registration";
import Login from "../user/auth/login/Login";
import Mainpage from "../user/pages/mainpage/Mainpage";
import Navbar from "../user/pages/navbar/Navbar";
import Footer from "../user/pages/footer/Footer";
import Contact from "../user/pages/contact/Contact";
import Categories from "../user/pages/categories/Categories";
import Updateprofile from "../user/pages/UpdateProfile/updateprofile";
import Admin_Login from "../admin/pages/Admin_Login";
import Admin from "../admin/Admin"
import Selar_Registrastion from "../selar/auth/registration/Selar_Registrastion";
import Selar_Login from "../selar/auth/login/Selar_Login";
import Selar_Dashboard from "../selar/page/dashboard/Selar_Dashboard";
import Selar_Navbar from "../selar/page/dashboard/Selar_Navbar";
import Selar_Sidebar from "../selar/page/dashboard/Selar_Sidebar";
import User_Manage from "../admin/managements/User_Manage";
import Seller_Manage from '../admin/managements/Seller_Manage';
import Product_Catalog from "../admin/managements/Product_Catlog";
import User_Details from "../admin/managements/User_Details";
import PrivateRoute from "./PrivateRouter"; //  Import the private route wrapper

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/*  Public User Routes */}
        <Route path="/" element={<Mainpage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mainpage" element={<Mainpage />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/footer" element={<Footer />} />

        {/*  Protected User Route */}
        <Route
          path="/updateprofile"
          element={
            <PrivateRoute role="user">
              <Updateprofile />
            </PrivateRoute>
          }
        />

        {/*  Public Admin Route */}
        <Route path="/admin_login" element={<Admin_Login />} />

        {/*  Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path="/user_manage"
          element={
            <PrivateRoute role="admin">
              <User_Manage />
            </PrivateRoute>
          }
        />
        <Route
          path="/seller_manage"
          element={
            <PrivateRoute role="admin">
              <Seller_Manage />
            </PrivateRoute>
          }
        />
        <Route
          path="/product_catlog"
          element={
            <PrivateRoute role="admin">
              <Product_Catalog />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/allUsers/:id"
          element={
            <PrivateRoute role="admin">
              <User_Details />
            </PrivateRoute>
          }
        />

        {/*  Seller Routes  */}
        <Route path="/Selar_Registrastion" element={<Selar_Registrastion />} />
        <Route path="/selar_login" element={<Selar_Login />} />
        <Route path="/selar_dashboard" element={<Selar_Dashboard />} />
        <Route path="/selar_navbar" element={<Selar_Navbar />} />
        <Route path="/selar_sidebar" element={<Selar_Sidebar />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
