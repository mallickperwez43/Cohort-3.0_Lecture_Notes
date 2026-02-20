import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import api from '../../api/axios';

const AdminDashboard = () => {
    // 1. Form for course info (Create/Edit)
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    // 2. Form for course content (Lessons)
    const {
        register: registerContent,
        handleSubmit: handleSubmitContent,
        control,
        reset: resetContent
    } = useForm({
        defaultValues: { lessons: [{ title: "", videoUrl: "" }] }
    });

    // useFieldArray allows us to dynamically add/remove lesson inputs
    const { fields, append, remove } = useFieldArray({
        control,
        name: "lessons"
    });

    const [myCourses, setMyCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingCourseId, setEditingCourseId] = useState(null);
    const [selectedCourseForContent, setSelectedCourseForContent] = useState(null);

    const fetchAdminCourses = async () => {
        try {
            const response = await api.get('/admin/course/bulk');
            setMyCourses(response.data.courses);
        } catch (error) {
            console.error("Failed to fetch courses", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdminCourses();
    }, []);

    // Course CRUD Logic (Handles both POST and PUT)
    const onCourseSubmit = async (data) => {
        try {
            if (editingCourseId) {
                // UPDATE: Hits adminRouter.put("/course")
                await api.put('/admin/course', { ...data, courseId: editingCourseId });
                alert("Course updated successfully");
            } else {
                // CREATE: Hits adminRouter.post("/course")
                await api.post('/admin/course', data);
                alert("Course created successfully");
            }

            // Cleanup
            setEditingCourseId(null);
            reset();
            fetchAdminCourses();
        } catch (error) {
            console.error("Validation Error Details:", error.response?.data?.errors);
            alert(error.response?.data?.message || "Operation failed");
        }
    };

    // Function to populate form for editing
    const handleEditClick = (course) => {
        setEditingCourseId(course._id);
        setValue("title", course.title);
        setValue("description", course.description);
        setValue("price", course.price);
        setValue("imageUrl", course.imageUrl);
        // Smooth scroll back to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Function to handle deletion
    const handleDelete = async (courseId) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;
        try {
            await api.delete('/admin/course/delete', { data: { courseId } });
            alert("Course deleted");
            fetchAdminCourses();
        } catch (error) {
            alert("Failed to delete course");
        }
    };

    // Lesson submission logic
    const onContentSubmit = async (data) => {
        try {
            await api.post('/admin/course/content', {
                courseId: selectedCourseForContent._id,
                lessons: data.lessons
            });
            alert("Lessons updated successfully!");
            setSelectedCourseForContent(null);
            resetContent();
        } catch (error) {
            alert("Failed to update content");
        }
    };

    return (
        <div className='max-w-6xl mx-auto p-6'>

            {/* LESSON MANAGEMENT MODAL */}
            {selectedCourseForContent && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="flex justify-between items-center mb-6 border-b pb-4">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Manage Content</h2>
                                <p className="text-sm text-purple-600">{selectedCourseForContent.title}</p>
                            </div>
                            <button onClick={() => setSelectedCourseForContent(null)} className="text-gray-400 hover:text-gray-600 text-3xl">&times;</button>
                        </div>

                        <form onSubmit={handleSubmitContent(onContentSubmit)} className="space-y-4">
                            {fields.map((field, index) => (
                                <div key={field.id} className="p-4 border rounded-xl bg-gray-50 flex gap-4 items-start relative">
                                    <div className="flex-1 space-y-3">
                                        <input
                                            {...registerContent(`lessons.${index}.title`, { required: true })}
                                            placeholder="Lesson Title"
                                            className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-400"
                                        />
                                        <input
                                            {...registerContent(`lessons.${index}.videoUrl`, { required: true })}
                                            placeholder="Video URL"
                                            className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-400"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={() => append({ title: "", videoUrl: "" })}
                                className="w-full py-3 border-2 border-dashed border-purple-300 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition"
                            >
                                + Add Another Lesson
                            </button>

                            <div className="flex gap-4 pt-4">
                                <button type="submit" className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition shadow-lg">
                                    Save Content
                                </button>
                                <button type="button" onClick={() => setSelectedCourseForContent(null)} className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* DASHBOARD MAIN VIEW */}
            <div className='flex flex-col md:flex-row gap-8'>
                {/* Left Side: Course Form */}
                <div className='md:w-1/3'>
                    <div className={`bg-white p-6 rounded-2xl shadow-xl border-t-8 sticky top-24 transition-all ${editingCourseId ? 'border-yellow-500' : 'border-purple-600'}`}>
                        <h2 className='text-xl font-bold mb-4 text-gray-800'>
                            {editingCourseId ? "Update Course Info" : "Create New Course"}
                        </h2>
                        <form onSubmit={handleSubmit(onCourseSubmit)} className='space-y-4'>
                            <input {...register("title", { required: true })} placeholder='Course Title' className='w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-purple-400' />
                            <textarea {...register("description", { required: true })} placeholder='Full Description' className='w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-purple-400' rows={4} />

                            {/* valueAsNumber is critical here for backend Zod validation */}
                            <input type='number' {...register("price", { required: true, valueAsNumber: true })} placeholder='Price (USD)' className='w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-purple-400' />

                            <input {...register("imageUrl", { required: true })} placeholder='Thumbnail Image URL' className='w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-purple-400' />

                            <button type='submit' className={`w-full text-white py-3 rounded-xl font-bold shadow-lg transition ${editingCourseId ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-purple-600 hover:bg-purple-700'}`}>
                                {editingCourseId ? "Save Changes" : "Publish Course"}
                            </button>

                            {editingCourseId && (
                                <button
                                    type="button"
                                    onClick={() => { setEditingCourseId(null); reset(); }}
                                    className="w-full text-gray-500 text-sm hover:underline mt-2"
                                >
                                    Cancel Editing
                                </button>
                            )}
                        </form>
                    </div>
                </div>

                {/* Right Side: Course List */}
                <div className='md:w-2/3'>
                    <h2 className='text-2xl font-bold mb-6 text-gray-800'>Course Management</h2>
                    {loading ? (
                        <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div></div>
                    ) : (
                        <div className='space-y-4'>
                            {myCourses.map(course => (
                                <div key={course._id} className='bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-5 border border-gray-100'>
                                    <img src={course.imageUrl} alt="" className='w-24 h-24 object-cover rounded-xl bg-gray-100' />
                                    <div className='flex-1'>
                                        <h3 className='font-bold text-lg text-gray-900'>{course.title}</h3>
                                        <p className='text-purple-600 font-bold'>${course.price}</p>
                                        <div className='flex gap-4 mt-3'>
                                            <button onClick={() => handleEditClick(course)} className='text-blue-600 text-sm font-bold hover:text-blue-800'>Edit Info</button>
                                            <button onClick={() => setSelectedCourseForContent(course)} className='text-green-600 text-sm font-bold hover:text-green-800'>Manage Lessons</button>
                                            <button onClick={() => handleDelete(course._id)} className='text-red-500 text-sm font-bold hover:text-red-700'>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;