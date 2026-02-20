import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const Signin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { login } = useAuth(); // Get login function from context

    const onSubmit = async (data) => {
        try {
            // 1. Hit the backend signin endpoint
            const response = await api.post('/user/signin', data);

            // 2. Update global AuthContext (pass user data and the role)
            login(response.data.user, 'user');

            // 3. Redirect to home or dashboard
            navigate('/');
        } catch (error) {
            alert(error.response?.data?.message || "Invalid email or password");
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">User Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account? <Link to="/user/signup" className="text-blue-600 hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Signin;