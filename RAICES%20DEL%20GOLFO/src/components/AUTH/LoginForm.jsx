// src/components/AUTH/LoginForm.jsx
// Formulario de Login reutilizable

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from './AuthForm';
import { loginUser } from '../../services/authService';

const LoginForm = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setError('');
    
    // Validaciones
    if (!formData.email || !formData.password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, ingresa un email válido.');
      return;
    }

    try {
      setLoading(true);
      const user = await loginUser(formData.email, formData.password);

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        const role = user.role ? user.role.toLowerCase().trim() : '';
        
        if (role === 'admin') {
          navigate('/admin');
        } else if (role === 'cliente' || role === 'user') {
          navigate('/cliente');
        } else {
          navigate('/');
        }
      } else {
        setError('El correo electrónico o la contraseña son incorrectos.');
      }
    } catch (err) {
      setError('Ocurrió un error al iniciar sesión. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      name: 'email',
      type: 'email',
      placeholder: 'Correo electrónico',
      label: 'Email',
      autoComplete: 'email',
      required: true
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Contraseña',
      label: 'Contraseña',
      autoComplete: 'current-password',
      required: true
    }
  ];

  const footerLinks = [
    {
      text: '¿No tienes cuenta?',
      href: '/registro',
      label: 'Regístrate aquí'
    },
    {
      text: '¿Olvidaste tu contraseña?',
      href: '#',
      label: 'Recupérala'
    },
    {
      text: 'Volver a',
      href: '/',
      label: 'Inicio'
    }
  ];

  return (
    <AuthForm
      title="Iniciar Sesión"
      fields={fields}
      onSubmit={handleSubmit}
      submitText="Iniciar Sesión"
      footerLinks={footerLinks}
      loading={loading}
      error={error}
    />
  );
};

export default LoginForm;