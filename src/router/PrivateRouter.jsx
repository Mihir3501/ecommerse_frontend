import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  // Grab both user and admin info from Redux
  const userInfo = useSelector((state) => state.auth); // user auth slice
  const adminInfo = useSelector((state) => state.admin.adminInfo); // admin slice

  const isUserLoggedIn = !!userInfo?.token;
  const isAdminLoggedIn = !!adminInfo?.token;

  const currentRole = isAdminLoggedIn ? adminInfo?.role : userInfo?.user?.role;

  const isAuthenticated = isUserLoggedIn || isAdminLoggedIn;

  if (!isAuthenticated) {
    return <Navigate to={role === "admin" ? "/adminlogin" : "/login"} />;
  }

  if (role && currentRole !== role) {
    return <Navigate to="/not-authorized" />; 
  }

  return children;
};

export default PrivateRoute;
