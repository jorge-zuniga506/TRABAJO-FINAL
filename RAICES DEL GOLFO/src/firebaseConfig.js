// src/firebaseConfig.js
// Configuración central de Firebase y Firestore
// IMPORTANTE: Reemplaza los valores de firebaseConfig
// con los que te da Firebase Console al crear tu app web.

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Copia aquí tu configuración real desde Firebase Console
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Inicializar Firebase (solo una vez en toda la app)
const app = initializeApp(firebaseConfig);

// Exportar la instancia de Firestore para usarla en los services
export const db = getFirestore(app);

export default app;
