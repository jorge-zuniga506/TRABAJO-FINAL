// src/components/AUTH/AuthForm.jsx
// Componente genérico de formulario para Login y Registro
// Altamente reutilizable con fields configurables

import React, { useState } from 'react';
import '../styles/AuthForm.css';

/**
 * AuthForm - Formulario genérico de autenticación
 * 
 * Props:
 * - title: Título del formulario (ej: "Iniciar Sesión")
 * - fields: Array de objetos con config de campos
 * - onSubmit: Función callback al enviar
 * - submitText: Texto del botón (ej: "Iniciar Sesión")
 * - footerLinks: Array de objetos {text, href, label}
 * - loading: Boolean para estado de carga
 * - error: String con mensaje de error
 */
const AuthForm = ({
  title = 'Formulario',
  fields = [],
  onSubmit,
  submitText = 'Enviar',
  footerLinks = [],
  loading = false,
  error = ''
}) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) {
      await onSubmit(formData);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className="auth-form__header">
        <h1 className="auth-form__title">{title}</h1>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="auth-form__error" role="alert">
          <span className="auth-form__error-icon">⚠️</span>
          <span className="auth-form__error-text">{error}</span>
        </div>
      )}

      {/* Campos del formulario */}
      <div className="auth-form__fields">
        {fields.map((field) => (
          <div key={field.name} className="auth-form__field">
            {field.label && (
              <label htmlFor={field.name} className="auth-form__label">
                {field.label}
              </label>
            )}
            <input
              id={field.name}
              type={field.type || 'text'}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              disabled={loading}
              autoComplete={field.autoComplete}
              required={field.required !== false}
              className="auth-form__input"
              aria-label={field.label || field.placeholder}
            />
            {field.error && (
              <p className="auth-form__field-error">{field.error}</p>
            )}
          </div>
        ))}
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        className="auth-form__submit"
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="auth-form__spinner"></span>
            {submitText}...
          </>
        ) : (
          submitText
        )}
      </button>

      {/* Enlaces al pie */}
      {footerLinks.length > 0 && (
        <div className="auth-form__footer">
          {footerLinks.map((link, idx) => (
            <p key={idx} className="auth-form__footer-text">
              {link.text}{' '}
              <a href={link.href} className="auth-form__link">
                {link.label}
              </a>
            </p>
          ))}
        </div>
      )}
    </form>
  );
};

export default AuthForm;