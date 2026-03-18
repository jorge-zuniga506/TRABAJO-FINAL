import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../services/authService';

const Inicioseccion = () => {
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
            const user = await loginUser(email, password);

            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                
                if (user.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            } else {
                setError('El correo electrónico o la contraseña son incorrectos.');
            }
        } catch (err) {
            setError('Ocurrió un error al iniciar sesión. Inténtelo de nuevo más tarde.');
        }
    };

    return (
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
                <p>
                    Don't have an account? <Link to="/registro">Register here</Link>
                </p>
                <p>
                    Regresar a Inicio <Link to="/">Inicio</Link>
                </p>
            </div>
        </div>
    );
};

export default Inicioseccion;
