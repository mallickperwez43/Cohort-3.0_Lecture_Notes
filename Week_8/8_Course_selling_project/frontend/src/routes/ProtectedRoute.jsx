import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRole }) => {
    const { role, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!role) {
        return <Navigate to="/user/signin" />;
    }

    if (allowedRole && role !== allowedRole) {
        return <Navigate to="/" />;
    }

    return children;
};