// src/components/ProductList.jsx
// Lista de productos desde Firestore (colección "products")

import React, { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../services/firebaseService";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET (equivalente a fetch GET /products)
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error cargando productos:", err);
      setError(err.message || "Error cargando productos");
    } finally {
      setLoading(false);
    }
  };

  // DELETE (equivalente a fetch DELETE /products/:id)
  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error eliminando producto:", err);
      setError(err.message || "Error eliminando producto");
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="container">
      <h2>Lista de Productos</h2>
      <button onClick={fetchProducts}>Recargar</button>

      {products.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.name}</td>
                <td>{prod.price}</td>
                <td>{prod.stock}</td>
                <td>{prod.description}</td>
                <td>
                  <button onClick={() => handleDelete(prod.id)}>
                    Eliminar
                  </button>
                  {/* Aquí podrías agregar botón para editar usando updateProduct */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// components/ProductList.jsx
import React, { useState, useEffect } from "react";
import { getAllProducts, deleteProduct } from "../services/firebaseService";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter(p => p.id !== productId));
        alert("Producto eliminado correctamente");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de Productos</h2>
      <button onClick={fetchProducts}>Recargar</button>

      {products.length === 0 ? (
        <p>No hay productos disponibles</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <button onClick={() => handleDelete(product.id)}>
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

export default ProductList;
