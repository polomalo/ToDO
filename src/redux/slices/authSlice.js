import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../api/axiosInstance';

export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData, thunkAPI) => {
        try {
            const response = await instance.post('/auth/login', userData);
            localStorage.setItem('token', response.data.token);
            return response.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: localStorage.getItem('token') || null, loading: false, error: null },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
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

export const { logout } = authSlice.actions;
export default authSlice.reducer;