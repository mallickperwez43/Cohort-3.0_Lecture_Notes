import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const CourseDetails = () => {
    const { courseId } = useParams();
    const { user, role } = useAuth();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                // Fetching from your public preview route
                const res = await api.get('/course/preview');
                const foundCourse = res.data.courses.find(c => c._id === courseId);
                setCourse(foundCourse);
            } catch (err) {
                console.error("Error loading course:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourseData();
    }, [courseId]);

    const handlePurchase = async () => {
        // 1. Check if user is logged in
        if (!user) {
            alert("Please login to purchase this course");
            return navigate('/user/signin');
        }

        // 2. Prevent Admins from buying (optional logic)
        if (role === 'admin') {
            return alert("Admins cannot purchase courses. Please use a user account.");
        }

        try {
            // 3. Hit your backend POST /api/v1/course/purchase
            const response = await api.post('/course/purchase', { courseId });
            alert(response.data.message);
            navigate('/purchases'); // Move to their library
        } catch (err) {
            alert(err.response?.data?.message || "Purchase failed");
        }
    };

    if (loading) return <div className="text-center p-20 text-xl font-semibold">Loading course...</div>;
    if (!course) return <div className="text-center p-20 text-xl text-red-500">Course not found!</div>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left Side: Course Info */}
                <div className="md:col-span-2">
                    <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-full h-96 object-cover rounded-2xl shadow-lg mb-8"
                    />
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{course.title}</h1>
                    <div className="prose max-w-none text-gray-600 text-lg">
                        <p>{course.description}</p>
                    </div>
                </div>

                {/* Right Side: Purchase Card */}
                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-24">
                        <p className="text-3xl font-bold text-gray-900 mb-6">${course.price}</p>

                        <button
                            onClick={handlePurchase}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all hover:shadow-lg active:scale-95"
                        >
                            Buy Now
                        </button>

                        <div className="mt-6 space-y-4">
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="mr-2">✅</span> Lifetime Access
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="mr-2">✅</span> Certificate of Completion
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="mr-2">✅</span> Access on Mobile and PC
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;   