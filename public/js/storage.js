// Utility functions for localStorage
const StorageManager = {
    getUser() {
        const user = localStorage.getItem('tankio_user');
        return user ? JSON.parse(user) : null;
    },

    setUser(user) {
        localStorage.setItem('tankio_user', JSON.stringify(user));
    },

    getToken() {
        return localStorage.getItem('tankio_token');
    },

    setToken(token) {
        localStorage.setItem('tankio_token', token);
    },

    clearAuth() {
        localStorage.removeItem('tankio_user');
        localStorage.removeItem('tankio_token');
    },

    isAuthenticated() {
        return !!this.getToken() && !!this.getUser();
    }
};

// Check if user is authenticated and redirect if needed
function checkAuthentication() {
    if (!StorageManager.isAuthenticated()) {
        window.location.href = 'index.html';
    }
}
