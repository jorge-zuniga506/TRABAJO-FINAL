// src/components/AUTH/AuthCard.jsx
// Componente para contenido visual (lado derecho)
// Imagen, logo y texto descriptivo

import React from 'react';
import SharkLogo from '../common/SharkLogo';
import '../styles/AuthCard.css';

/**
 * AuthCard - Contenedor visual derecho (Desktop/Tablet)
 * Se oculta en móvil con CSS
 * 
 * Props:
 * - title: Título principal
 * - description: Texto descriptivo
 * - image: URL de imagen (opcional)
 * - showLogo: Boolean (muestra logo de tiburón)
 */
const AuthCard = ({
  title = 'Bienvenido',
  description = 'Descubre la belleza del Golfo de Nicoya. Un paraíso natural te espera.',
  image = null,
  showLogo = true
}) => {
  return (
    <div className="auth-card">
      {/* Fondo con gradiente */}
      <div className="auth-card__background"></div>

      {/* Contenido */}
      <div className="auth-card__content">
        {/* Logo */}
        {showLogo && (
          <div className="auth-card__logo">
            <SharkLogo color="white" size="large" />
          </div>
        )}

        {/* Imagen (opcional) */}
        {image && (
          <div className="auth-card__image">
            <img 
              src={image} 
              alt="Decoración"
              loading="lazy"
            />
          </div>
        )}

        {/* Texto */}
        <div className="auth-card__text">
          {title && <h2 className="auth-card__title">{title}</h2>}
          {description && (
            <p className="auth-card__description">{description}</p>
          )}
        </div>

        {/* Elementos decorativos */}
        <div className="auth-card__decorations">
          <div className="auth-card__decoration auth-card__decoration--1"></div>
          <div className="auth-card__decoration auth-card__decoration--2"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;