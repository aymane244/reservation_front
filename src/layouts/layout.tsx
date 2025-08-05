import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import Login from '../user/login';
import Register from '../user/register';
import ForgotPassword from '../user/forgotPassword';
import Navbar from './navbar';
import { fetchUser } from '../features/auth/authSlice';
import AdminLogin from '../admin/login';
import AdminForgotPassword from '../admin/forgotPassword';
import Dashboard from '../user/dashboard';
import AdminNavbar from './admin/navbar';
import AdminDashboard from '../admin/dashboard';
import Plan from '../homepage/plan';
import AdminPlans from '../admin/plans';
import Subscription from '../homepage/subscription';

function PrivateRoute({ isAuthenticated, isLoaded }: { isAuthenticated: boolean; isLoaded: boolean }){
    if(!isLoaded){
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export default function Layout(){
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, isLoaded, user } = useSelector((state: RootState) => state.auth);

   useEffect(() => {
        if(!isLoaded){
            dispatch(fetchUser());
        }
    }, [dispatch, isLoaded]);

    return (
        <BrowserRouter>
            <Routes>
                {/* user paths */}
                <Route path="/" element={<Navbar />}>
                    <Route index element={<Plan />} />
                    <Route path="plan-subscription/:id" element={<Subscription />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="register/:name" element={<Register />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />

                {/* Admin paths */}
                <Route path='admin/login' element={<AdminLogin/>} />
                <Route path="admin/forgot-password" element={<AdminForgotPassword />} />
                <Route element={<PrivateRoute isAuthenticated={isAuthenticated} isLoaded={isLoaded} />}>
                    <Route element={<PrivateRoute isAuthenticated={isAuthenticated} isLoaded={isLoaded} />}>
                        <Route path="/admin/*" element={user?.is_admin ? <AdminNavbar /> : <Navigate to="/" replace />}>
                            <Route path="dashboard" element={<AdminDashboard />} />
                            <Route path="plans" element={<AdminPlans />} />
                        </Route>

                        <Route path="/dashboard" element={!user?.is_admin ? <Navbar /> : <Navigate to="/admin/dashboard" replace />}>
                            <Route index element={<Dashboard />} />
                        </Route>
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/'} replace />} />
            </Routes>
        </BrowserRouter>
    );
}