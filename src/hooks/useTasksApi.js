import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://todo-redev.herokuapp.com/api';
const API_TOKEN = import.meta.env.VITE_API_TOKEN || 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpbWE3MDEyMDk1QGdtYWlsLmNvbSIsImlkIjoxODg4LCJpYXQiOjE3NTg2MjYyNDJ9.OGxoSuY_HlkCwqY16lFrlg3Lk707-UOpvBKqEMYxHYs';

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: API_TOKEN
    }
});

const useTasksApi = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const getTasks = async () => {
        setLoading(true);
        try {
            const response = await instance.get('/todos');
            setTasks(response.data);
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении задач:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (title) => {
        setLoading(true);
        try {
            await instance.post('/todos', { title });
            await getTasks();
        } catch (error) {
            console.error('Ошибка при добавлении задачи:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const toggleTask = async (id) => {
        setLoading(true);
        try {
            await instance.patch(`/todos/${id}/isCompleted`);
            await getTasks();
        } catch (error) {
            console.error('Ошибка при изменении статуса задачи:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const editTask = async (id, newTitle) => {
        setLoading(true);
        try {
            await instance.patch(`/todos/${id}`, { title: newTitle });
            await getTasks();
        } catch (error) {
            console.error('Ошибка при редактировании задачи:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async (id) => {
        setLoading(true);
        try {
            await instance.delete(`/todos/${id}`);
            await getTasks();
        } catch (error) {
            console.error('Ошибка при удалении задачи:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const clearCompletedTasks = async () => {
        setLoading(true);
        try {
            const completedTasks = tasks.filter(task => task.isCompleted === true);
            const deletePromises = completedTasks.map(task =>
                instance.delete(`/todos/${task.id}`)
            );
            await Promise.all(deletePromises);
            await getTasks();
        } catch (error) {
            console.error('Ошибка при удалении выполненных задач:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        tasks,
        loading,
        getTasks,
        addTask,
        toggleTask,
        editTask,
        deleteTask,
        clearCompletedTasks
    };
};

export default useTasksApi;