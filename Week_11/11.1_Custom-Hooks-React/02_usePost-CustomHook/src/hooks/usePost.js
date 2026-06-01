import { useEffect, useState } from 'react'

const usePost = () => {
    const [post, setPost] = useState({});

    const getPost = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        const json = await response.json();
        setPost(json);
    }

    useEffect(() => {
        getPost();
    }, []);

    return { post };
}

export default usePost;