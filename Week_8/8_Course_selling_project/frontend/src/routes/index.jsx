import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import Landing from '../pages/Landing';
import Signup from '../pages/user/Signup';
import Signin from '../pages/user/Signin';
import AdminSignup from '../pages/admin/AdminSignup';
import AdminSignin from '../pages/admin/AdminSignin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import Purchases from '../pages/user/Purchases';
import CourseDetails from '../pages/CourseDetails';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/user/signup" element={<Signup />} />
            <Route path="/user/signin" element={<Signin />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/admin/signin" element={<AdminSignin />} />
            <Route path="/course/:courseId" element={<CourseDetails />} />

            {/* Protected User Routes */}
            <Route path="/purchases" element={
                <ProtectedRoute allowedRole="user">
                    <Purchases />
                </ProtectedRoute>
            } />

            {/* Protected Admin Routes */}
            <Route path="/admin/dashboard" element={
                <ProtectedRoute allowedRole="admin">
                    <AdminDashboard />
                </ProtectedRoute>
            } />
        </Routes>
    );
};

export default AppRoutes;