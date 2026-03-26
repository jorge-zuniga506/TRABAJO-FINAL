import { ENDPOINTS } from '../config/api';

const settingsService = {
    getSettings: async () => {
        try {
            const response = await fetch(ENDPOINTS.SETTINGS);
            if (!response.ok) throw new Error('Error al cargar la configuración');
            return await response.json();
        } catch (error) {
            console.error('Error in settingsService.getSettings:', error);
            throw error;
        }
    },

    updateSettings: async (settings) => {
        try {
            const response = await fetch(ENDPOINTS.SETTINGS, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(settings),
            });
            if (!response.ok) throw new Error('Error al actualizar la configuración');
            return await response.json();
        } catch (error) {
            console.error('Error in settingsService.updateSettings:', error);
            throw error;
        }
    }
};

export default settingsService;
