import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { fetchTenantUser } from '../../features/auth/authSlice';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, isLoaded, user } = useSelector((state: RootState) => state.auth);

    if (!isLoaded) return <div>Loading...</div>;
    if (!isAuthenticated || user?.is_admin) return <Navigate to="/" replace />;

    useEffect(() => {
        if(!isLoaded){
            dispatch(fetchTenantUser());
        }
    }, [dispatch, isLoaded]);

    return <>{children}</>;
};

export default RequireAuth;
