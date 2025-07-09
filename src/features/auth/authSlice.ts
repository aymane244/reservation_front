import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from './axiosInstance';

interface AuthState {
    isAuthenticated: boolean;
    isLoaded: boolean;
    isLoading: boolean;
    user: null | { first_name: string; last_name: string; email: string, is_admin: boolean, };
}

export const fetchUser = createAsyncThunk(
    'auth/fetchUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/api/user/get');
            return response.data.user;
        } catch (error: any) {
            if (error.response?.status === 401) {
                // User not logged in — this is expected, no error
                return rejectWithValue(null);
            }
            // Other errors, treat normally
            return rejectWithValue('Failed to fetch user');
        }
    }
);

const initialState: AuthState = {
    isAuthenticated: false,
    isLoaded: false,
    isLoading: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ first_name: string; last_name: string; email: string, is_admin: boolean }>) {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.isLoaded = true;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.isLoaded = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.isLoaded = false;
                state.isLoading = false;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.isLoaded = true;
                state.isLoading = false;
            })
            .addCase(fetchUser.rejected, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.isLoaded = true;
                state.isLoading = false;
            });
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
