import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';
import { required } from 'zod/mini';

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            // hit backend post api/v1/user/signup
            const response = await api.post('/user/signup', data);
            alert("Signup successfully! Please login");
            navigate('/user/signin');
        } catch (error) {
            alert(error.response?.data?.message || 'Signup failed')
        }
    }

    return (
        <div className='min-h-[80vh] flex items-center justify-center'>
            <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100'>
                <h2 className='text-3xl font-bold text-gray-800 mb-6 text-center'>Create Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>First Name</label>
                        <input
                            {...register("firstName", { required: "First name is required" })}
                            className='w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none'
                        />
                        {errors.firstName && <p className='text-red-500 text-xs mt-1'>{errors.firstName.message}</p>}
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Last Name</label>
                        <input
                            {...register("lastName", { required: "Last name is required" })}
                            className='w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none'
                        />
                        {errors.lastName && <p className='text-red-500 text-xs mt-1'>{errors.lastName.message}</p>}
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Email Address</label>
                        <input
                            type='email'
                            {...register("email", { required: "Email is required" })}
                            className='w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none'
                        />
                        {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Password</label>
                        <input
                            type='password'
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Minimum 6 characters" }
                            })}
                            className='w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none'
                        />
                        {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>}
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors pt-2 cursor-pointer'
                    >
                        Sign Up
                    </button>
                </form>

                <p className='mt-4 text-center text-sm text-gray-600'>
                    Already have an account? <Link to={"/user/signin"} className='text-blue-600 hover:underline'>Sign In</Link>
                </p>
            </div>
        </div >
    )
}

export default Signup
