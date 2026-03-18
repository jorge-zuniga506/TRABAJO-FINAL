export const API = 'http://localhost:3007/users';

export const registerUser = async (user) => {
    const userWithRole = { ...user, role: 'cliente' };
    const response = await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userWithRole),
    });
    return response.json();
};

export const loginUser = async (email, password) => {
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();
    
    console.log(`Intentando login para: ${cleanEmail}`);
    
    try {
        const response = await fetch(`${API}?email=${cleanEmail}&password=${cleanPassword}`);
        const users = await response.json();
        
        if (users.length > 0) {
            console.log("Usuario encontrado:", users[0].email);
            return users[0];
        } else {
            // Fallback: buscar manualmente por si json-server query falla
            console.log("No encontrado vía query, intentando filtrado manual...");
            const allResponse = await fetch(API);
            const allUsers = await allResponse.json();
            const foundUser = allUsers.find(u => 
                u.email.toLowerCase().trim() === cleanEmail.toLowerCase() && 
                u.password.toString().trim() === cleanPassword.toString()
            );
            return foundUser || null;
        }
    } catch (error) {
        console.error("Error en loginUser:", error);
        throw error;
    }
};