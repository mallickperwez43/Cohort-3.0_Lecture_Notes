import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const AdminSignin = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { login } = useAuth();

    const onSubmit = async (data) => {
        try {
            const response = await api.post('/admin/signin', data);
            // Crucial: Set role to 'admin'
            login(response.data.admin, 'admin');
            navigate('/admin/AdminDashboard');
        } catch (error) {
            alert(error.response?.data?.message || "Admin Login failed");
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border-t-6 border-purple-600">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input type="email" {...register("email")} placeholder="Admin Email" className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 outline-none" />
                    <input type="password" {...register("password")} placeholder="Password" className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 outline-none" />
                    <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md font-bold hover:bg-purple-700 transition">
                        Login to Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminSignin;