import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [finalData, setFinalData] = useState({});
    const [error, setError] = useState(null);
    const [reqFetched, setReqFetched] = useState(false);

    const getDetails = async () => {
        setReqFetched(false);
        setError(false);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setFinalData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setReqFetched(true);
        }
    }

    useEffect(() => {
        getDetails();
    }, [url]);

    return { finalData, error, reqFetched };
};

export default useFetch;