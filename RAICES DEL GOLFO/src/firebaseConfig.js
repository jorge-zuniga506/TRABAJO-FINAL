// src/firebaseConfig.js
// Configuración central de Firebase para Raíces del Golfo
// Aquí inicializamos Firebase y exportamos Firestore (db)
// para usarlo en todos los servicios de la app.

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Analytics es opcional; solo funciona en navegador
import { getAnalytics } from "firebase/analytics";

// Configuración que te dio Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBtG4FPtlTcC2E7FaoJmLMoPEiVU_BlgIU",
  authDomain: "raices-del-golfo.firebaseapp.com",
  projectId: "raices-del-golfo",
  storageBucket: "raices-del-golfo.firebasestorage.app",
  messagingSenderId: "535872516135",
  appId: "1:535872516135:web:3f4ff04721d9205dd25e02",
  measurementId: "G-FG2ERCNCLW"
};

// Inicializar Firebase (solo una vez en toda la app)
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

// (Opcional) Inicializar Analytics solo si está disponible el objeto window
// para evitar errores en entornos donde no hay navegador (SSR, pruebas, etc.)
let analytics;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (e) {
    console.warn("Analytics no pudo inicializarse:", e);
  }
}

export { analytics };
export default app;
