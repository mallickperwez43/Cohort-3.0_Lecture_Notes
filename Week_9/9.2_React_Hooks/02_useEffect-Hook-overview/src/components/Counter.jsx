import React, { useEffect, useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0);

    console.log("counter");

    //
    useEffect(() => {
        const timer = setInterval(() => {
            setCount((count) => {
                return count + 1;
            });
        }, 1000);

        console.log("Mounted");

        return () => {
            clearInterval(timer);
            console.log("Unmounted");
        };
    }, []);

    return (
        <div>
            <h2>{count}</h2>
        </div>
    )
}

export default Counter
