import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }
    try {
      // Esta es una simulación de login. Idealmente, harías una llamada a tu backend.
      const response = await fetch(`http://localhost:5001/users?email=${email}&password=${password}`);
      const users = await response.json();
      
      if (users.length > 0) {
        // Simulación: guardar usuario en localStorage
        localStorage.setItem('user', JSON.stringify(users[0]));
        navigate('/'); // Redirige a la página de inicio si el login es exitoso
      } else {
        setError('El correo electrónico o la contraseña son incorrectos.');
      }
    } catch (err) {
      setError('Ocurrió un error al iniciar sesión. Inténtelo de nuevo más tarde.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form-container">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">LOGIN</button>
          </form>
          <div className="auth-options">
            <a href="#">Forgot password?</a>
            <p>
              Don't have an account? <Link to="/registro">Register here</Link>
            </p>
          </div>
        </div>
        <div className="auth-info-container">
          <h1>RAICES DEL GOLFO</h1>
          <p>Conectando con la naturaleza, protegiendo nuestro futuro.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
