import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../services/authService';

const RegistroForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError('Por favor, complete todos los campos.');
            return;
        }
        try {
            await registerUser({ name, email, password });
            navigate('/login');
        } catch (err) {
            setError('Ocurrió un error al registrarse. Inténtelo de nuevo más tarde.');
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Registro</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <button type="submit">REGISTRARSE</button>
            </form>
            <div className="auth-options">
                <p>
                    ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
                </p>
            </div>
        </div>
    );
};

export default RegistroForm;
