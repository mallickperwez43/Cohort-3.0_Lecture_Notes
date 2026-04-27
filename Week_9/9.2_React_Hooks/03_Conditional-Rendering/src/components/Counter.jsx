import React, { useEffect, useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(1);
    console.log("counter")

    useEffect(() => {
        let clock = setInterval(() => {
            setCount((count) => {
                return count + 1;
            });
        }, 1000);
        console.log("Mounted");

        return () => {
            clearInterval(clock);
            console.log("Unmounted");
        }
    }, []);

    return (
        <div>
            <h2>{count}</h2>
        </div>
    )
}

export default Counter
