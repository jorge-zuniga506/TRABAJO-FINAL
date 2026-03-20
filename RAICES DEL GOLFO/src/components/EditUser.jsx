// src/components/EditUser.jsx
// Formulario para EDITAR usuarios en Firestore (colección "users")

import React, { useEffect, useState } from "react";
import { getUserById, updateUser } from "../services/firebaseService";

function EditUser({ userId, onUpdated, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: ""
  });
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // GET by ID (equivalente a fetch GET /users/:id)
  useEffect(() => {
    if (!userId) return;
    const loadUser = async () => {
      try {
        setLoadingUser(true);
        const user = await getUserById(userId);
        if (user) {
          setFormData({
            name: user.name || "",
            email: user.email || "",
            age: user.age ?? ""
          });
        }
        setError(null);
      } catch (err) {
        console.error("Error cargando usuario:", err);
        setError(err.message || "Error cargando usuario");
      } finally {
        setLoadingUser(false);
      }
    };
    loadUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // PUT (equivalente a fetch PUT /users/:id)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;
    setError(null);
    setSuccess(false);

    try {
      setLoading(true);
      await updateUser(userId, {
        name: formData.name,
        email: formData.email,
        age: formData.age ? parseInt(formData.age, 10) : null
      });
      setSuccess(true);
      if (onUpdated) onUpdated();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error actualizando usuario:", err);
      setError(err.message || "Error actualizando usuario");
    } finally {
      setLoading(false);
    }
  };

  if (!userId) return null;
  if (loadingUser) return <p>Cargando datos del usuario...</p>;

  return (
    <div className="form-container">
      <h2>Editar Usuario</h2>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {success && (
        <p style={{ color: "green" }}>¡Usuario actualizado correctamente!</p>
      )}

      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Correo:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Edad:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// components/EditUser.jsx
import React, { useState, useEffect } from "react";
import { getUserById, updateUser } from "../services/firebaseService";

function EditUser({ userId, onUserUpdated }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: ""
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      setFetching(true);
      const user = await getUserById(userId);
      if (user) {
        setFormData({
          name: user.name || "",
          email: user.email || "",
          age: user.age || ""
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setFetching(false);
    }
  };

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

    try {
      setLoading(true);
      await updateUser(userId, {
        name: formData.name,
        email: formData.email,
        age: parseInt(formData.age) || null
      });

      setSuccess(true);
      if (onUserUpdated) {
        onUserUpdated();
      }

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p>Cargando datos del usuario...</p>;

  return (
    <div>
      <h2>Editar Usuario</h2>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {success && <p style={{ color: "green" }}>¡Usuario actualizado correctamente!</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Edad:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Actualizando..." : "Actualizar Usuario"}
        </button>
      </form>
    </div>
  );
}

export default EditUser;
