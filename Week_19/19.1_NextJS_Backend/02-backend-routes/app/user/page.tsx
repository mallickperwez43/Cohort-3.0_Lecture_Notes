import axios from "axios";
import Link from "next/link";

interface UserData {
    name: string;
    email: string;
}

const getUserDetails = async (): Promise<UserData> => {
    const result = await axios.get("http://localhost:3000/api/v1/user/details");
    await new Promise(r => setTimeout(r, 5000));
    return result.data;
}
const User = async () => {
    const userData: UserData = await getUserDetails();

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 antialiased flex flex-col justify-center items-center p-4 relative">
            <div className="w-full max-w-sm mb-4">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors duration-200 group"
                >
                    <svg
                        xmlns="http://w3.org"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Back to Main App
                </Link>
            </div>

            <div className="w-full max-w-sm bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-100/50 p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50">

                <div className="flex flex-col items-center mb-6">
                    <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mb-3 shadow-inner">
                        {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <h1 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        User Profile
                    </h1>
                </div>

                <div className="space-y-4">
                    <div className="border-b border-slate-50 pb-3">
                        <label className="text-[11px] font-medium text-slate-400 block mb-0.5">Name</label>
                        <p className="text-base font-semibold text-slate-800">{userData?.name || "N/A"}</p>
                    </div>

                    <div>
                        <label className="text-[11px] font-medium text-slate-400 block mb-0.5">Email Address</label>
                        <p className="text-sm font-medium text-slate-600 break-all">{userData?.email || "N/A"}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default User;