import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { role, logout } = useAuth();

    return (
        <nav className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-lg">
            <Link to="/" className="text-xl font-bold">Course-App</Link>
            <div className="space-x-4">
                <Link to="/" className="hover:text-blue-400">Courses</Link>

                {!role ? (
                    <>
                        <Link to="/user/signup" className="bg-blue-600 px-4 py-2 rounded">User Signup</Link>
                        <Link to="/admin/signup" className="bg-purple-600 px-4 py-2 rounded">Admin</Link>
                    </>
                ) : (
                    <>
                        {role === 'user' && <Link to="/purchases">My Courses</Link>}
                        {role === 'admin' && <Link to="/admin/dashboard">Admin Panel</Link>}
                        <button onClick={() => logout(role)} className="text-red-400 hover:text-red-300 font-medium">Logout</button>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar
