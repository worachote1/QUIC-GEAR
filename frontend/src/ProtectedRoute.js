import { Outlet, Navigate } from 'react-router-dom';

import React from 'react'

export default function ProtectedRoute({ element, path, ...rest }) {
    const current_user = JSON.parse(sessionStorage.getItem('current_user'));

    // If no user session
    if (!current_user) {
      return <Navigate to="/login" replace />;
    }
  
    // If trying to access admin routes without admin role
    if (window.location.pathname.includes('/admin') && current_user.role !== "admin") {
      return <Navigate to="/" replace />;
    }
  
    return <Outlet />;
}
