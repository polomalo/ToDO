import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../api/axiosInstance';

export const getTasks = createAsyncThunk(
    'tasks/getTasks',
    async (_, thunkAPI) => {
        try {
            const response = await instance.get('/todos');
            return response.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 
                error.message || 
                'Произошла ошибка'
            );
        }
    }
)

export const addNewTask = createAsyncThunk(
    'tasks/addNewTask',
    async (title, thunkAPI) => {
        try {
            const response = await instance.post('/todos', { title });
            return response.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 
                error.message || 
                'Произошла ошибка'
            );
        }
    }
)

export const editTask = createAsyncThunk(
    'tasks/editTask',
    async ({ id, title }, thunkAPI) => {
        try {
            const response = await instance.patch(`/todos/${id}`, { title });
            return response.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 
                error.message || 
                'Произошла ошибка'
            );
        }
    }
)

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (id, thunkAPI) => {
        try {
            await instance.delete(`/todos/${id}`);
            return id;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 
                error.message || 
                'Произошла ошибка'
            );
        }
    }
)

export const checkTask = createAsyncThunk(
    'tasks/checkTask',
    async (id, thunkAPI) => {
        try {
            await instance.patch(`/todos/${id}/isCompleted`);
            return id;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 
                error.message || 
                'Произошла ошибка'
            );
        }
    }
)

export const clearCompletedTasks = createAsyncThunk(
    'tasks/clearCompletedTasks',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const completedTasks = state.tasks.items.filter(task => task.isCompleted);
            await Promise.all(completedTasks.map(task => instance.delete(`/todos/${task.id}`)));
            return completedTasks.map(task => task.id);
        }
        catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 
                error.message || 
                'Произошла ошибка'
            );
        }
    }
)

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: { items: [], loading: false, error: null },
    reducers: { clearError: (state) => { state.error = null } },
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(addNewTask.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(editTask.fulfilled, (state, action) => {
                const task = state.items.find(t => t.id === action.payload.id);
                if (task) task.title = action.payload.title;
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.items = state.items.filter(task => task.id !== action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(checkTask.fulfilled, (state, action) => {
                const task = state.items.find(t => t.id === action.payload);
                if (task) task.isCompleted = !task.isCompleted;
                state.loading = false;
                state.error = null;
            })
            .addCase(clearCompletedTasks.fulfilled, (state, action) => {
                state.items = state.items.filter(task => !action.payload.includes(task.id));
                state.loading = false;
                state.error = null;
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => { 
                    state.loading = true; 
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => { 
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    }
})

export const { clearError } = tasksSlice.actions;
export default tasksSlice.reducer;