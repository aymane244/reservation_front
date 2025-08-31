import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Login from '../user/login';
import Register from '../user/register';
import ForgotPassword from '../user/forgotPassword';
import Navbar from './navbar';
import AdminLogin from '../admin/login';
import AdminForgotPassword from '../admin/forgotPassword';
import Dashboard from '../user/dashboard';
import AdminNavbar from './admin/navbar';
import AdminDashboard from '../admin/dashboard';
import Plan from '../homepage/plan';
import AdminPlans from '../admin/plans';
import Subscription from '../homepage/subscription';
import AdminActivities from '../admin/activities/activity';
import RequireAdminAuth from '../components/auth/requireAdminAuth';
import RequireAuth from '../components/auth/requireAuth';

export default function Layout(){
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Navbar />}>
                    <Route index element={<Plan />} />
                    <Route path="plan-subscription/:id" element={<Subscription />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="register/:name" element={<Register />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />

                {/* Admin routes */}
                <Route path='admin/login' element={<AdminLogin/>} />
                <Route path="admin/forgot-password" element={<AdminForgotPassword />} />

                <Route path="/admin/*" element={
                    <RequireAdminAuth>
                        <AdminNavbar />
                    </RequireAdminAuth>
                }>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="plans" element={<AdminPlans />} />
                    <Route path="activities" element={<AdminActivities />} />
                </Route>

                {/* User dashboard */}
                <Route path="/dashboard" element={
                    <RequireAuth>
                        <Navbar />
                    </RequireAuth>
                }>
                    <Route index element={<Dashboard />} />
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/'} replace />} />
            </Routes>
        </BrowserRouter>
    );
}