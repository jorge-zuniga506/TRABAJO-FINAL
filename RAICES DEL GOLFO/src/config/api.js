// Configuracion central de endpoints.
// La URL base puede cambiar entre desarrollo local y produccion.
const DEFAULT_API_BASE_URL = 'http://localhost:3007';

const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;

export const API_BASE_URL = rawApiBaseUrl.replace(/\/+$/, '');

export const ENDPOINTS = {
    // Coleccion de usuarios para login, registro y administracion.
    USERS: `${API_BASE_URL}/users`,
    // Catalogo de habitaciones administrables y visibles en hospedaje.
    HABITACIONES: `${API_BASE_URL}/habitaciones`,
    // Catalogo de tours disponibles.
    TOURS: `${API_BASE_URL}/tours`,
    // Reservas de tours realizadas por los clientes.
    RESERVATIONS: `${API_BASE_URL}/reservations`,
    // Opiniones publicadas por usuarios.
    OPINIONES: `${API_BASE_URL}/opiniones`,
    // Mensajes recibidos desde formularios de contacto.
    CONTACTOS: `${API_BASE_URL}/formularioContacto`,
    // Reservas de habitaciones con fechas de entrada y salida.
    RESERVAS_HABITACIONES: `${API_BASE_URL}/room_reservations`,
    // Ajustes generales del sistema.
    SETTINGS: `${API_BASE_URL}/settings`,
};

export default API_BASE_URL;
