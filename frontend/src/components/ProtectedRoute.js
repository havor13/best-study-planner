// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute ensures that only authenticated users
 * can access certain routes. If no token is found, it
 * redirects to /login. Otherwise, it renders the children.
 */
function ProtectedRoute({ children }) {
  // ✅ Use the same key you store after login
  const token = localStorage.getItem("access");

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected component
  return children;
}

export default ProtectedRoute;
