// src/hooks/useSessionCleanup.js
// Hook para limpiar sesión cuando se navega a rutas públicas

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * useSessionCleanup
 * Limpia la sesión cuando el usuario navega a rutas públicas después de un tiempo
 * 
 * Uso:
 * useSessionCleanup();
 */
const useSessionCleanup = () => {
  const location = useLocation();

  // Rutas donde se debe permitir sesión indefinida
  const protectedRoutes = ['/admin', '/cliente'];

  // Rutas públicas
  const publicRoutes = [
    '/',
    '/login',
    '/registro',
    '/tours',
    '/habitaciones',
    '/gastronomia',
    '/transporte',
    '/acerca-de',
    '/historia-de-las-islas',
    '/isla-venado'
  ];

  useEffect(() => {
    const currentPath = location.pathname;

    // Si está en ruta pública
    const isInPublicRoute = publicRoutes.some(route => currentPath === route);

    if (isInPublicRoute) {
      // Limpiar sesión después de 1 minuto de inactividad en ruta pública
      const timer = setTimeout(() => {
        try {
          const user = localStorage.getItem('user');
          if (user) {
            console.log('Limpiando sesión por navegación a ruta pública');
            localStorage.removeItem('user');
            sessionStorage.clear();
          }
        } catch (error) {
          console.error('Error limpiando sesión:', error);
        }
      }, 60000); // 1 minuto

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);
};

export default useSessionCleanup;