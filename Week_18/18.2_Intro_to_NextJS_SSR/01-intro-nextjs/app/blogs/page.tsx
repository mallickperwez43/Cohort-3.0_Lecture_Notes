import axios from "axios";

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

async function getBlogs() { // Using the benefit of SSR in next js to get prefilled HTML
    const response = await axios.get<Todo[]>("https://jsonplaceholder.typicode.com/todos"); // The Next JS way to network call and get data on next js server to be able to return a prefilled HTML 
    return response.data;
}

export default async function Blogs() {
    const blogs: Todo[] = await getBlogs();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center font-semibold bg-purple-200 p-6">
            <h1 className="text-3xl font-extrabold text-purple-900 mb-6">Todo List</h1>

            <ul className="w-full max-w-md bg-white rounded-xl shadow-md divide-y divide-gray-100 overflow-hidden">
                {blogs.slice(0, 15).map((blog: Todo) => (
                    <li
                        key={blog.id}
                        className={`p-4 text-lg transition-colors hover:bg-purple-50 ${blog.completed ? "text-gray-400 line-through" : "text-gray-800"
                            }`}
                    >
                        {blog.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}