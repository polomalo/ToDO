import axios from 'axios';
import { ROUTES } from "@constants/routes";

const API_URL = import.meta.env.VITE_API_URL || 'https://todo-redev.herokuapp.com/api';

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Обработка ошибок на уровне interceptor
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Можно добавить логику для обработки 401 (unauthorized) - автоматический logout
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            // Используем window.location для полной перезагрузки страницы
            // чтобы очистить состояние Redux
            window.location.href = ROUTES.LOGIN;
        }
        return Promise.reject(error);
    }
);

export default instance;
