// src/components/CreateProduct.jsx
// Formulario para CREAR productos en Firestore (colección "products")

import React, { useState } from "react";
import { createProduct } from "../services/firebaseService";

function CreateProduct({ onProductCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    description: ""
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

    if (!formData.name || !formData.price || !formData.stock) {
      setError("Nombre, precio y stock son requeridos");
      return;
    }

    try {
      setLoading(true);
      const newProduct = await createProduct({
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
        description: formData.description
      });

      setSuccess(true);
      setFormData({ name: "", price: "", stock: "", description: "" });

      if (onProductCreated) {
        onProductCreated(newProduct); // para recargar listas en el padre
      }

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error creando producto:", err);
      setError(err.message || "Error creando producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Nuevo Producto</h2>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {success && (
        <p style={{ color: "green" }}>¡Producto creado correctamente!</p>
      )}

      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Tour de avistamiento de ballenas"
          />
        </div>

        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Ej: 999.99"
            step="0.01"
          />
        </div>

        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Ej: 50"
          />
        </div>

        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción del producto"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear Producto"}
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
