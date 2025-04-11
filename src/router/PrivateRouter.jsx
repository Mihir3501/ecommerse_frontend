import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// adminOnly = true → only allow admins
// adminOnly = false (default) → only allow normal users
const PrivateRouter = ({ children, adminOnly = false }) => {
  const userInfo = useSelector((state) => state.auth); // user state
  const adminInfo = useSelector((state) => state.admin?.adminInfo); // safely access adminInfo

  const isUserLoggedIn = !!userInfo?.token;
  const isAdminLoggedIn = !!adminInfo?.token;

  if (adminOnly && !isAdminLoggedIn) {
    return <Navigate to="/admin_login" />;
  }

  if (!adminOnly && !isUserLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRouter;
