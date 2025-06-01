import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem("token");
  // If token exists, render children (the protected page); else, redirect to login
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
