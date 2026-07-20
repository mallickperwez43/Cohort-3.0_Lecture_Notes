import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../icons/BrainIcon";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { API } from "../lib/api";

export const SignUp = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", username: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        if (!form.name || !form.username || !form.email || !form.password) {
            setError("All fields are required");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const res = await fetch(API.auth.signup, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Signup failed");
                return;
            }
            navigate("/signin");
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
                    <h1 className="text-xl font-bold text-slate-800">Create your account</h1>
                    <p className="text-sm text-slate-400 mt-1">Start building your second brain today</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-slate-600">Name</label>
                        <Input placeholder="John Doe" name="name" value={form.name} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-slate-600">Username</label>
                        <Input placeholder="johndoe" name="username" value={form.username} onChange={handleChange} />
                    </div>
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
                    text={loading ? "Creating account..." : "Create Account"}
                    onClick={handleSubmit}
                />

                <p className="text-sm text-center text-slate-400">
                    Already have an account?{" "}
                    <span
                        className="text-btn-primary-bg font-semibold cursor-pointer hover:underline"
                        onClick={() => navigate("/signin")}
                    >
                        Sign in
                    </span>
                </p>
            </div>
        </div>
    );
};