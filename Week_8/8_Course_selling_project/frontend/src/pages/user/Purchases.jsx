import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const Purchases = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const res = await api.get('/user/purchases');
                // Your backend returns: { purchasedCourses: [ { course, lessons }, ... ] }
                setPurchases(res.data.purchasedCourses);
            } catch (err) {
                console.error("Failed to load purchases", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPurchases();
    }, []);

    if (loading) return <div className="p-20 text-center">Loading your courses...</div>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Purchased Courses</h1>

            {purchases.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
                    <p className="text-gray-500 text-lg">You haven't purchased any courses yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8">
                    {purchases.map((item) => (
                        <div key={item.course._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
                            {/* Course Image */}
                            <img
                                src={item.course.imageUrl}
                                alt={item.course.title}
                                className="w-full md:w-64 h-48 object-cover"
                            />

                            {/* Course Info & Lessons */}
                            <div className="p-6 flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.course.title}</h2>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.course.description}</p>

                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <h3 className="text-sm font-bold text-gray-700 uppercase mb-3 tracking-wide">
                                        Course Content ({item.lessons.length} Lessons)
                                    </h3>
                                    {item.lessons.length > 0 ? (
                                        <ul className="space-y-2">
                                            {item.lessons.map((lesson, idx) => (
                                                <li key={idx} className="flex items-center text-sm text-gray-700 bg-white p-2 rounded border border-gray-100">
                                                    <span className="mr-3 text-blue-500 font-bold">{idx + 1}.</span>
                                                    <span className="flex-1">{lesson.title}</span>
                                                    {lesson.videoUrl && (
                                                        <a
                                                            href={lesson.videoUrl}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-blue-600 hover:text-blue-800 font-medium"
                                                        >
                                                            Watch Video
                                                        </a>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-400 italic">Content haven't uploaded by Creator</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Purchases;