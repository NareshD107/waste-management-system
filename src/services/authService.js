import api from './api';

const authService = {
    login: async (email, password) => {
        // Mock login
        const user = {
            id: 1,
            email: email,
            token: 'mock-jwt-token',
        };
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    },

    logout: () => {
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (!userStr) return null;
        try {
            return JSON.parse(userStr);
        } catch (e) {
            return null;
        }
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('user');
    }
};

export default authService;
