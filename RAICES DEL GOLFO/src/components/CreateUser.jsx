// src/components/CreateUser.jsx
// Formulario para CREAR usuarios en Firestore (colección "users")

import React, { useState } from "react";
import { createUser } from "../services/firebaseService";

function CreateUser({ onUserCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.name || !formData.email) {
      setError("Nombre y correo son obligatorios");
      return;
    }

    try {
      setLoading(true);
      const newUser = await createUser({
        name: formData.name,
        email: formData.email,
        age: formData.age ? parseInt(formData.age, 10) : null
      });

      setSuccess(true);
      setFormData({ name: "", email: "", age: "" });

      if (onUserCreated) {
        onUserCreated(newUser); // para recargar listas en el padre
      }

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error creando usuario:", err);
      setError(err.message || "Error creando usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Usuario</h2>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {success && (
        <p style={{ color: "green" }}>¡Usuario creado correctamente!</p>
      )}

      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre completo"
          />
        </div>

        <div>
          <label>Correo:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div>
          <label>Edad (opcional):</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Edad"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Crear Usuario"}
        </button>
      </form>
    </div>
  );
}

// components/CreateUser.jsx
import React, { useState } from "react";
import { createUser } from "../services/firebaseService";

function CreateUser({ onUserCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validación básica
    if (!formData.name || !formData.email) {
      setError("Nombre y email son requeridos");
      return;
    }

    try {
      setLoading(true);
      const newUser = await createUser({
        name: formData.name,
        email: formData.email,
        age: parseInt(formData.age) || null
      });

      setSuccess(true);
      setFormData({ name: "", email: "", age: "" });

      if (onUserCreated) {
        onUserCreated(newUser);
      }

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Usuario</h2>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {success && <p style={{ color: "green" }}>¡Usuario creado correctamente!</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Juan Pérez"
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ej: juan@example.com"
          />
        </div>

        <div>
          <label>Edad:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Ej: 25"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear Usuario"}
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
