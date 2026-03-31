# Despliegue

## 1. Backend con `db.json`

Este proyecto usa `json-server` para exponer los datos de `db.json` como API REST.

### Local

```bash
npm install
npm run api
```

API local:

```txt
http://localhost:3007
```

### Render o Railway

Usa este proyecto como servicio Node y configura:

- Build Command: `npm install`
- Start Command: `npm run api`

El servidor tomara automaticamente `PORT` desde la plataforma.

## 2. Frontend en Firebase Hosting

Configura la variable de entorno del frontend antes del build:

```bash
VITE_API_BASE_URL=https://TU-BACKEND.onrender.com
```

En Windows PowerShell:

```powershell
$env:VITE_API_BASE_URL="https://TU-BACKEND.onrender.com"
npm run build
firebase deploy
```

## 3. Flujo recomendado

1. Sube el backend primero.
2. Copia la URL publica del backend.
3. Compila el frontend con `VITE_API_BASE_URL` apuntando a esa URL.
4. Publica el frontend en Firebase Hosting.
