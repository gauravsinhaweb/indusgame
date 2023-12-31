import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export const PrivateRoute = ({ isTokenExpired }) => {
  if (isTokenExpired) {
    toast.error("Unauthorized access!");
  }
  return !isTokenExpired ? <Outlet /> : <Navigate to="/login" />;
};
