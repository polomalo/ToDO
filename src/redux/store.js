import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './slices/tasksSlice';
import authSlice from './slices/authSlice';
import regSlice from './slices/regSlice'


export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    auth: authSlice,
    registration: regSlice
  },
});

