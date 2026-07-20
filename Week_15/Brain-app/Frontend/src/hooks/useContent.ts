import { useState, useEffect, useCallback } from "react";
import { API } from "../lib/api";

export interface ContentItem {
    _id: string;
    title: string;
    link?: string;
    type: "video" | "tweet" | "article" | "image";
    tags?: { title: string }[];
    userId?: { username: string };
}

export const useContent = () => {
    const [contents, setContents] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchContent = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(API.content.get, { credentials: "include" });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Failed to fetch");
                return;
            }
            setContents(data.content);
        } catch {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    }, []);

    const addContent = async (payload: {
        title: string;
        link?: string;
        type: "video" | "tweet" | "article" | "image";
        tags?: string[];
    }) => {
        try {
            const res = await fetch(API.content.create, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Failed to add");
                return;
            }
            await fetchContent();
        } catch {
            setError("Something went wrong");
        }
    };

    const deleteContent = async (id: string) => {
        try {
            const res = await fetch(API.content.delete(id), {
                method: "DELETE",
                credentials: "include",
            });
            if (!res.ok) return;
            setContents(prev => prev.filter(c => c._id !== id));
        } catch {
            setError("Something went wrong");
        }
    };

    const updateContent = async (id: string, payload: {
        title?: string;
        link?: string;
        type?: "video" | "tweet" | "article" | "image";
        tags?: string[];
    }) => {
        try {
            const res = await fetch(API.content.update(id), {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Failed to update");
                return;
            }
            await fetchContent();
        } catch {
            setError("Something went wrong");
        }
    };

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setLoading(true);
            try {
                const res = await fetch(API.content.get, { credentials: "include" });
                const data = await res.json();
                if (cancelled) return;
                if (!res.ok) {
                    setError(data.message || "Failed to fetch");
                    return;
                }
                setContents(data.content); // backend returns "content"
            } catch {
                if (!cancelled) setError("Something went wrong");
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => { cancelled = true; };
    }, []);

    return { contents, loading, error, addContent, deleteContent, updateContent, refetch: fetchContent };
};