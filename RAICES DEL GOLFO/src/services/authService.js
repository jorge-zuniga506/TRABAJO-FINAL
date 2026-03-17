import { API } from './authService';

export const registerUser = async (user) => {
    const response = await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    return response.json();
};

export const loginUser = async (email, password) => {
    const response = await fetch(`${API}?email=${email}&password=${password}`);
    const users = await response.json();
    return users.length > 0 ? users[0] : null;
};