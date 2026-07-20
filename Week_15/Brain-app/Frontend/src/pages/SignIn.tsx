import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../icons/BrainIcon";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { API } from "../lib/api";

export const SignIn = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        if (!form.email || !form.password) {
            setError("All fields are required");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const res = await fetch(API.auth.signin, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // important — sends/receives cookies
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Sign in failed");
                return;
            }
            navigate("/dashboard");
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-main-bg flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl p-10 w-96 flex flex-col gap-6">

                <div className="flex items-center justify-center gap-3">
                    <div className="text-blue-600"><BrainIcon size="lg" /></div>
                    <span className="text-2xl font-bold text-slate-800">Second Brain</span>
                </div>

                <div>
                    <h1 className="text-xl font-bold text-slate-800">Welcome back</h1>
                    <p className="text-sm text-slate-400 mt-1">Sign in to your Second Brain</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-slate-600">Email</label>
                        <Input placeholder="john@example.com" name="email" value={form.email} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-slate-600">Password</label>
                        <Input placeholder="••••••••" name="password" type="password" value={form.password} onChange={handleChange} />
                    </div>
                </div>

                <Button
                    variant="primary"
                    size="md"
                    text={loading ? "Signing in..." : "Sign In"}
                    onClick={handleSubmit}
                />

                <p className="text-sm text-center text-slate-400">
                    Don't have an account?{" "}
                    <span
                        className="text-btn-primary-bg font-semibold cursor-pointer hover:underline"
                        onClick={() => navigate("/signup")}
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
};