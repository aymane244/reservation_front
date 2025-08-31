import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import adminAuthReducer from '../features/auth/adminAuthSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        adminAuth: adminAuthReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;