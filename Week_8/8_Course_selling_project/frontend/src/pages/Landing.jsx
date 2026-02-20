import React, { useEffect, useState } from 'react'
import api from '../api/axios';
import { Link } from 'react-router-dom';

const Landing = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // This hits http://localhost:3000/api/v1/course/preview
                const response = await api.get('/course/preview');
                setCourses(response.data.courses);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading courses...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Available Courses</h1>

            {courses.length === 0 ? (
                <p className="text-center text-gray-500">No courses available at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <div key={course._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                            <img
                                src={course.imageUrl || 'https://via.placeholder.com/400x200'}
                                alt={course.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h2>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                                    <Link
                                        to={`/course/${course._id}`}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Landing
