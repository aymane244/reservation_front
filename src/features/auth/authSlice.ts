import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tenantAxios } from './axiosInstance';

interface User {
    first_name: string;
    last_name: string;
    email: string;
    is_admin: boolean;
    activity_name: string;
    plan_name: string;
    is_trial: boolean;
    expire_date: Date;
}

interface AuthState {
    isAuthenticated: boolean;
    isLoaded: boolean;
    isLoading: boolean;
    user: User | null;
    tenantSubdomain: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    isLoaded: false,
    isLoading: false,
    user: null,
    tenantSubdomain: null,
};

// Fetch tenant user after redirection
export const fetchTenantUser = createAsyncThunk<User | null>(
    'auth/fetchTenantUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await tenantAxios.get('/api/user/get');
            const user = response.data.user;

            if (!user) return null;

            return {
                ...user,
                activity_name: user.activity?.name || '',
                plan_name: user.plan?.name || '',
                expire_date: new Date(user.trial_will_finish),
            };
        } catch (error: any) {
            return rejectWithValue(null);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        login(state, action: PayloadAction<{ user: User; tenantSubdomain: string }>) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.tenantSubdomain = action.payload.tenantSubdomain;
            state.isLoaded = true;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.tenantSubdomain = null;
            state.isLoaded = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTenantUser.pending, (state) => {
                state.isLoaded = false;
                state.isLoading = true;
            })
            .addCase(fetchTenantUser.fulfilled, (state, action) => {
                state.isAuthenticated = !!action.payload;
                state.user = action.payload;
                state.isLoaded = true;
                state.isLoading = false;
            })
            .addCase(fetchTenantUser.rejected, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.isLoaded = true;
                state.isLoading = false;
            });
    },
});

export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
