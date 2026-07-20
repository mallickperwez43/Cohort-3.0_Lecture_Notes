import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../icons/BrainIcon";

export const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-main-bg flex flex-col">

            {/* Navbar */}
            <nav className="flex items-center justify-between px-10 py-5 bg-white border-b border-gray-100 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="text-blue-600"><BrainIcon size="lg" /></div>
                    <span className="text-xl font-bold text-slate-800">Second Brain</span>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate("/signin")}
                        className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => navigate("/signup")}
                        className="px-5 py-2 text-sm font-semibold text-white bg-btn-primary-bg hover:opacity-90 rounded-lg transition-all"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <div className="flex flex-col items-center justify-center flex-1 text-center px-6 py-24 gap-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100">
                    ✦ Your personal knowledge hub
                </div>

                <h1 className="text-5xl font-extrabold text-slate-800 leading-tight max-w-2xl">
                    Store everything.<br />
                    <span className="text-btn-primary-bg">Forget nothing.</span>
                </h1>

                <p className="text-slate-500 text-lg max-w-xl leading-relaxed">
                    Save tweets, YouTube videos, articles, and notes — all in one place.
                    Your second brain remembers so you don't have to.
                </p>

                <div className="flex gap-3 mt-2">
                    <button
                        onClick={() => navigate("/signup")}
                        className="px-7 py-3 text-sm font-semibold text-white bg-btn-primary-bg hover:opacity-90 rounded-xl shadow-md transition-all"
                    >
                        Start for free →
                    </button>
                    <button
                        onClick={() => navigate("/signin")}
                        className="px-7 py-3 text-sm font-semibold text-slate-600 bg-white border border-gray-200 hover:bg-slate-50 rounded-xl shadow-sm transition-all"
                    >
                        Sign in
                    </button>
                </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-16 pb-24">
                {[
                    { emoji: "🎥", title: "YouTube Videos", desc: "Save and watch videos directly inside your brain. No more lost tabs." },
                    { emoji: "🐦", title: "Tweets", desc: "Capture tweets that inspire you before they disappear from your feed." },
                    { emoji: "📄", title: "Articles & Notes", desc: "Write notes or save articles and access them anytime, anywhere." },
                ].map(({ emoji, title, desc }) => (
                    <div key={title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow">
                        <span className="text-3xl">{emoji}</span>
                        <h3 className="text-base font-bold text-slate-800">{title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <footer className="text-center text-xs text-slate-400 pb-6">
                © {new Date().getFullYear()} Second Brain. All rights reserved.
            </footer>
        </div>
    );
};