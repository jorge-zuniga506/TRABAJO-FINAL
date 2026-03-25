// src/config/api.js

export const API_BASE_URL = 'http://localhost:3001';

export const ENDPOINTS = {
    USERS: `${API_BASE_URL}/users`,
    HABITACIONES: `${API_BASE_URL}/habitaciones`,
    TOURS: `${API_BASE_URL}/tours`,
    RESERVATIONS: `${API_BASE_URL}/reservations`,
    OPINIONES: `${API_BASE_URL}/opiniones`,
    CONTACTOS: `${API_BASE_URL}/formularioContacto`,
    RESERVAS_HABITACIONES: `${API_BASE_URL}/room_reservations`,
};

export default API_BASE_URL;
