const BASE_URL = 'http://localhost:3007/formularioContacto';

export const createContacto = async (contactoData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactoData),
    });

    if (!response.ok) {
      throw new Error('Error al enviar el mensaje');
    }

    return await response.json();
  } catch (error) {
    console.error("Error en createContacto:", error);
    throw error;
  }
};
