# Raíces del Golfo – Firebase Firestore y Hosting

Este proyecto React dejó de usar `json-server` y `db.json` y ahora funciona 100% online con **Firebase Firestore** y **Firebase Hosting**.

## 1. Configurar Firebase

1. Ve a [https://console.firebase.google.com](https://console.firebase.google.com).
2. Crea un proyecto Firebase.
3. En "Build" → "Firestore Database" crea la base de datos en modo de prueba (para desarrollo).
4. En "Project settings" → "General" → "Tus apps" → "Agregar app web".
5. Copia la configuración y pégala en `src/firebaseConfig.js` reemplazando: