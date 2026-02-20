import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axios'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true); // Start as TRUE

    const login = (userData, userRole) => {
        setUser(userData);
        setRole(userRole);
    };

    // Check if user is already logged in on refresh
    useEffect(() => {
        const checkSession = async () => {
            try {
                // We try both endpoints or create a single /me endpoint in backend
                // For now, let's assume we check user first
                const res = await api.get('/user/me');
                if (res.data.user) {
                    setUser(res.data.user);
                    setRole('user');
                }
            } catch (error) {
                // If user check fails, try admin
                try {
                    const adminRes = await api.get('/admin/me');
                    if (adminRes.data.admin) {
                        setUser(adminRes.data.admin);
                        setRole('admin');
                    }
                } catch (error) {
                    setUser(null);
                    setRole(null);
                }
            } finally {
                setLoading(false); // Stop loading regardless of result
            }
        };
        checkSession();
    }, []);

    const logout = async (type) => {
        try {
            await api.post(`/${type}/logout`);
            setUser(null);
            setRole(null);
        } catch (error) {
            console.error("Logout failed", error)
        }
    };

    return (
        <AuthContext.Provider value={{ user, role, login, logout, loading }}>
            {/* Don't render the app until we know the auth status */}
            {!loading ? children : (
                <div className="h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}
        </AuthContext.Provider>
    )
}

export { AuthProvider };
export const useAuth = () => useContext(AuthContext);