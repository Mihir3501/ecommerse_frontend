import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const token = useSelector((state) => state.auth.token); 
  const user = useSelector((state) => state.auth.user);    

  if (!token) {
    return <Navigate to="/login" />;
  }


  if (role && user?.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
