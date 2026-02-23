import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../api/axiosInstance';

export const signUpUser = createAsyncThunk(
    'users/register',
    async (userData, thunkAPI) => {
        try {
            const response = await instance.post('/users/register', userData);
            return response.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

const regSlice = createSlice({
    name: 'register',
    initialState: { user: null, loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.loading = false;
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => { state.loading = true; }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state) => { state.loading = false; }
            );
    }
})

// export const { logout } = regSlice.actions;
export default regSlice.reducer;