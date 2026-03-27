// src/components/AUTH/AuthLayout.jsx
// Componente layout base para Login y Registro
// Maneja el diseño responsive automáticamente

import React from 'react';
import '../styles/AuthLayout.css';

/**
 * AuthLayout - Componente contenedor para autenticación
 * 
 * Props:
 * - formComponent: El componente del formulario (LoginForm o RegisterForm)
 * - cardComponent: El componente de la tarjeta visual (AuthCard)
 * - layoutVariant: 'login' o 'register' (para variaciones visuales)
 */
const AuthLayout = ({ formComponent: FormComponent, cardComponent: CardComponent, layoutVariant = 'login' }) => {
  return (
    <div className="auth-layout">
      {/* Fondo de gradiente responsivo */}
      <div className="auth-layout__background"></div>
      
      {/* Contenedor principal */}
      <div className="auth-layout__container">
        {/* Sección del formulario */}
        <div className="auth-layout__form-section">
          {FormComponent && <FormComponent />}
        </div>

        {/* Sección de contenido visual (se oculta en móvil) */}
        <div className="auth-layout__card-section">
          {CardComponent && <CardComponent />}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;