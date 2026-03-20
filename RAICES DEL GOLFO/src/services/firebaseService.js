// src/services/firebaseService.js
// Capa de acceso a datos para Firestore
// Aquí reemplazamos las llamadas fetch (json-server) por funciones de Firebase.

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  Timestamp
} from "firebase/firestore";
import { db } from "../firebaseConfig";

// ==================== HELPERS GENÉRICOS ====================

// GET (colección completa)
export const getAllFromCollection = async (collectionName) => {
  try {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data()
    }));
  } catch (error) {
    console.error(`Error obteniendo documentos de ${collectionName}:`, error);
    throw error;
  }
};

// GET by ID
export const getByIdFromCollection = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    const snap = await getDoc(docRef);
    if (!snap.exists()) {
      console.warn(`${collectionName} - documento no encontrado (id: ${id})`);
      return null;
    }
    return { id: snap.id, ...snap.data() };
  } catch (error) {
    console.error(`Error obteniendo documento de ${collectionName}:`, error);
    throw error;
  }
};

// POST (crear)
export const createInCollection = async (collectionName, data) => {
  try {
    const colRef = collection(db, collectionName);
    const now = Timestamp.now();
    const docRef = await addDoc(colRef, {
      ...data,
      createdAt: now,
      updatedAt: now
    });
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error(`Error creando documento en ${collectionName}:`, error);
    throw error;
  }
};

// PUT/PATCH (actualizar)
export const updateInCollection = async (collectionName, id, data) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
    return { id, ...data };
  } catch (error) {
    console.error(`Error actualizando documento en ${collectionName}:`, error);
    throw error;
  }
};

// DELETE
export const deleteFromCollection = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    return { success: true, id };
  } catch (error) {
    console.error(`Error eliminando documento en ${collectionName}:`, error);
    throw error;
  }
};

// ==================== USUARIOS (envuelve helpers genéricos) ====================

const USERS_COLLECTION = "users";

export const getAllUsers = () => getAllFromCollection(USERS_COLLECTION);

export const getUserById = (userId) =>
  getByIdFromCollection(USERS_COLLECTION, userId);

export const createUser = (userData) =>
  createInCollection(USERS_COLLECTION, userData);

export const updateUser = (userId, userData) =>
  updateInCollection(USERS_COLLECTION, userId, userData);

export const deleteUser = (userId) =>
  deleteFromCollection(USERS_COLLECTION, userId);

// ==================== PRODUCTOS ====================

const PRODUCTS_COLLECTION = "products";

export const getAllProducts = () =>
  getAllFromCollection(PRODUCTS_COLLECTION);

export const getProductById = (productId) =>
  getByIdFromCollection(PRODUCTS_COLLECTION, productId);

export const createProduct = (productData) =>
  createInCollection(PRODUCTS_COLLECTION, productData);

export const updateProduct = (productId, productData) =>
  updateInCollection(PRODUCTS_COLLECTION, productId, productData);

export const deleteProduct = (productId) =>
  deleteFromCollection(PRODUCTS_COLLECTION, productId);

// ==================== BÚSQUEDAS / QUERIES ====================

export const searchProductsByName = async (searchTerm) => {
  try {
    const colRef = collection(db, PRODUCTS_COLLECTION);
    const q = query(
      colRef,
      where("name", ">=", searchTerm),
      where("name", "<=", searchTerm + "\uf8ff")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data()
    }));
  } catch (error) {
    console.error("Error buscando productos por nombre:", error);
    throw error;
  }
};

export const getLatestProducts = async (limitNum = 10) => {
  try {
    const colRef = collection(db, PRODUCTS_COLLECTION);
    const q = query(colRef, orderBy("createdAt", "desc"), limit(limitNum));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data()
    }));
  } catch (error) {
    console.error("Error obteniendo últimos productos:", error);
    throw error;
  }
};
