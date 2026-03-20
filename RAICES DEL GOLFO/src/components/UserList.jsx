// src/components/UserList.jsx
// Lista de usuarios desde Firestore (colección "users")

import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../services/firebaseService";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET (equivalente a fetch GET /users)
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
      setError(err.message || "Error cargando usuarios");
    } finally {
      setLoading(false);
    }
  };

  // DELETE (equivalente a fetch DELETE /users/:id)
  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar usuario?")) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Error eliminando usuario:", err);
      setError(err.message || "Error eliminando usuario");
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="container">
      <h2>Lista de Usuarios</h2>
      <button onClick={fetchUsers}>Recargar</button>

      {users.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Edad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((usr) => (
              <tr key={usr.id}>
                <td>{usr.name}</td>
                <td>{usr.email}</td>
                <td>{usr.age ?? "-"}</td>
                <td>
                  <button onClick={() => handleDelete(usr.id)}>
                    Eliminar
                  </button>
                  {/* Aquí podrías agregar botón para editar usando EditUser */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// components/UserList.jsx
import React, { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "../services/firebaseService";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
        alert("Usuario eliminado correctamente");
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <button onClick={fetchUsers}>Recargar</button>

      {users.length === 0 ? (
        <p>No hay usuarios disponibles</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserList;
