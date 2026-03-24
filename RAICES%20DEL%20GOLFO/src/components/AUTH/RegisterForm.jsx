// src/components/AUTH/RegisterForm.jsx
// Formulario de Registro reutilizable

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import { registerUser } from '../../services/authService';

const RegisterForm = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setError('');

    // Validaciones
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (formData.name.trim().length < 3) {
      setError('El nombre debe tener al menos 3 caracteres.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, ingresa un email válido.');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      setLoading(true);
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      navigate('/login');
    } catch (err) {
      if (err.message && err.message.includes('already')) {
        setError('Este correo ya está registrado. Intenta con otro.');
      } else {
        setError('Ocurrió un error al registrarse. Inténtalo de nuevo.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Nombre completo',
      label: 'Nombre',
      autoComplete: 'name',
      required: true
    },
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
      autoComplete: 'new-password',
      required: true
    },
    {
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirmar contraseña',
      label: 'Confirmar Contraseña',
      autoComplete: 'new-password',
      required: true
    }
  ];

  const footerLinks = [
    {
      text: '¿Ya tienes cuenta?',
      href: '/login',
      label: 'Inicia sesión aquí'
    },
    {
      text: 'Volver a',
      href: '/',
      label: 'Inicio'
    }
  ];

  return (
    <AuthForm
      title="Crear Cuenta"
      fields={fields}
      onSubmit={handleSubmit}
      submitText="Crear Cuenta"
      footerLinks={footerLinks}
      loading={loading}
      error={error}
    />
  );
};

export default RegisterForm;