// src/features/admin/adminAuthSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import adminAxios, { removeAdminToken, setAdminToken } from './adminAxios';

interface AdminState {
    isAuthenticated: boolean;
    isLoaded: boolean;
    isLoading: boolean;
    admin: null | { first_name: string; last_name: string; email: string; is_super_admin: boolean };
}

export const fetchAdmin = createAsyncThunk(
    'adminAuth/fetchAdmin',
    async (_, { rejectWithValue }) => {
        try {
            const response = await adminAxios.get('/api/admin/get');
            return response.data.admin;
        } catch (error: any) {
            if (error.response?.status === 401) {
                localStorage.removeItem('admin_token');
                removeAdminToken();
                return rejectWithValue(null);
            }
            return rejectWithValue('Failed to fetch admin');
        }
    }
);

const initialState: AdminState = {
    isAuthenticated: false,
    isLoaded: false,
    isLoading: false,
    admin: null,
};

const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        adminLogin(state, action: PayloadAction<{ first_name: string; last_name: string; email: string; is_super_admin: boolean; token: string }>) {
            state.isAuthenticated = true;
            state.admin = {
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                email: action.payload.email,
                is_super_admin: action.payload.is_super_admin,
            };
            state.isLoaded = true;
            setAdminToken(action.payload.token);
            localStorage.setItem('admin_token', action.payload.token);
        },
        adminLogout(state) {
            state.isAuthenticated = false;
            state.admin = null;
            state.isLoaded = true;
            removeAdminToken();
            localStorage.removeItem('admin_token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdmin.pending, (state) => {
                state.isLoaded = false;
                state.isLoading = true;
            })
            .addCase(fetchAdmin.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.admin = action.payload;
                state.isLoaded = true;
                state.isLoading = false;
            })
            .addCase(fetchAdmin.rejected, (state) => {
                state.isAuthenticated = false;
                state.admin = null;
                state.isLoaded = true;
                state.isLoading = false;
            });
    },
});

export const { adminLogin, adminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;