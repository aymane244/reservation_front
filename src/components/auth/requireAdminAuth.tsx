// src/components/auth/RequireAdminAuth.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../app/store';
import { setAdminToken } from '../../features/auth/adminAxios';
import { fetchAdmin } from '../../features/auth/adminAuthSlice';

const RequireAdminAuth = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, isLoaded, admin } = useSelector((state: RootState) => state.adminAuth);

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (token) {
            setAdminToken(token);
            if (!isLoaded) {
                dispatch(fetchAdmin());
            }
        }
    }, [dispatch, isLoaded]);

    if (!isLoaded) return <div>Loading...</div>;
    if (!isAuthenticated || !admin) return <Navigate to="/admin/login" replace />;

    return <>{children}</>;
};

export default RequireAdminAuth;