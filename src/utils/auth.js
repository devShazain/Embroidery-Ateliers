// Authentication utility with JWT support

// Store the current user and token in localStorage
const USER_STORAGE_KEY = 'embroidery_ateliers_user';
const TOKEN_STORAGE_KEY = 'embroidery_ateliers_token';

// Save user and token to localStorage
export const saveUser = (user, token) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

// Get user from localStorage
export const getUser = () => {
    const userJson = localStorage.getItem(USER_STORAGE_KEY);
    return userJson ? JSON.parse(userJson) : null;
};

// Get token from localStorage
export const getToken = () => {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
};

// Remove user and token from localStorage
export const removeUser = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
};

// Check if user is logged in
export const isLoggedIn = () => {
    return !!getToken();
};

// Get user ID
export const getUserId = () => {
    const user = getUser();
    return user ? user.id : null;
};

// Get authorization header for API requests
export const getAuthHeader = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};