import { useEffect, useState } from "react";

const useFetch = (baseUrl, interval) => {
    const [id, setId] = useState(1); // Internal state to track post ID
    const [finalData, setFinalData] = useState({});
    const [error, setError] = useState(null);
    const [reqFetched, setReqFetched] = useState(false);

    const getPosts = async (currentId) => {
        setReqFetched(false);
        setError(null);
        try {
            const response = await fetch(`${baseUrl}/${currentId}`);
            if (!response.ok) throw new Error("Failed to fetch");
            const data = await response.json();
            setFinalData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setReqFetched(true);
        }
    }

    // Effect 1: Handle the Fetching when ID changes
    useEffect(() => {
        getPosts(id);
    }, [id, baseUrl]);

    // Effect 2: Handle the 10s Rotation Logic
    useEffect(() => {
        if (interval) {
            const timer = setInterval(() => {
                setId((prev) => (prev >= 5 ? 1 : prev + 1));
            }, interval);
            return () => clearInterval(timer);
        }
    }, [interval]);

    // Return setId so the buttons in App.jsx can still override it
    return { finalData, error, reqFetched, id, setId };
};

export default useFetch;
