import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';

const AdminSignup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await api.post('/admin/signup', data);
            alert("Admin Account Created! Please log in.");
            navigate('/admin/signin');
        } catch (error) {
            alert(error.response?.data?.message || "Admin Signup failed");
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border-t-6 border-purple-600">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Admin Portal</h2>
                <p className="text-center text-gray-500 mb-6 italic">Create an instructor account</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                        <input {...register("firstName")} placeholder="First Name" className="p-2 border rounded focus:ring-2 focus:ring-purple-500 outline-none" />
                        <input {...register("lastName")} placeholder="Last Name" className="p-2 border rounded focus:ring-2 focus:ring-purple-500 outline-none" />
                    </div>
                    <input type="email" {...register("email")} placeholder="Admin Email" className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 outline-none" />
                    <input type="password" {...register("password")} placeholder="Password" className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 outline-none" />

                    <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md font-bold hover:bg-purple-700 transition">
                        Register as Admin
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Already an admin? <Link to="/admin/signin" className="text-purple-600 font-semibold">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default AdminSignup;