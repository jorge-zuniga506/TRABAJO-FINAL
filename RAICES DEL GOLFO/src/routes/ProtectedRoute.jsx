import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userStr = localStorage.getItem('user');
  
  if (!userStr) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userStr);
    
    // Si no se especifican roles permitidos, solo verificamos que esté logueado
    if (!allowedRoles) {
      return children;
    }

    // Verificar si el rol del usuario está en la lista de roles permitidos
    if (allowedRoles.includes(user.role)) {
      return children;
    } else {
      // Si el rol no coincide (ej. un cliente intentando entrar a admin)
      // Redirigir según su rol real
      if (user.role === 'admin') return <Navigate to="/admin" replace />;
      if (user.role === 'cliente') return <Navigate to="/cliente" replace />;
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
