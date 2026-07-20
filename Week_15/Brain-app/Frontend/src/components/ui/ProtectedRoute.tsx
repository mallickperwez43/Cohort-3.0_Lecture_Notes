import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const [status, setStatus] = useState<"loading" | "auth" | "unauth">("loading");

    useEffect(() => {
        fetch("/api/v1/user/me", { credentials: "include" })
            .then(res => setStatus(res.ok ? "auth" : "unauth"))
            .catch(() => setStatus("unauth"));
    }, []);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-main-bg flex items-center justify-center">
                <p className="text-slate-400 text-sm">Loading...</p>
            </div>
        );
    }

    return status === "auth" ? <>{children}</> : <Navigate to="/signin" replace />;
};