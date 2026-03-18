import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userStr = localStorage.getItem('user');
  
  if (!userStr) {
    // Si no hay usuario logueado, redirige al login
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userStr);
    // Verificar si el usuario es administrador
    if (user.role === 'admin') {
      return children;
    } else {
      // Si está logueado pero no es admin, redirige al inicio
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    // En caso de error al leer localStorage, redirige al login
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
