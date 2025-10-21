import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // O un spinner de carga
  }

  if (!user) {
    // Si no hay usuario logueado, redirigir a la página de login
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    // Si se requiere rol de admin y el usuario no lo tiene, redirigir a la página principal
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
