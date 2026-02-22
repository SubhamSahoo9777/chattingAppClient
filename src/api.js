import axios from 'axios';

// Base URL configuration
// const BASE_URL = 'http://localhost:5000';
export const BASE_URL = 'https://chattingappserver-oepf.onrender.com';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('chat-user'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid, logout user
            localStorage.removeItem('chat-user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// API endpoints
export const authAPI = {
    login: (email, password) => api.post('/api/auth/login', { email, password }),
    register: (username, email, password) => api.post('/api/auth/register', { username, email, password })
};

export const chatAPI = {
    // Conversations
    getConversations: () => api.get('/api/chat/conversations'),
    
    // Messages
    getMessages: (conversationId) => api.get(`/api/chat/messages/${conversationId}`),
    sendMessage: (data) => api.post('/api/chat/messages', data)
};

export default api;
