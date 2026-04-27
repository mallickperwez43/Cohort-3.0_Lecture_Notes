import React, { useEffect } from 'react'

const Counter = ({ count, one }) => {
    console.log("inside counter")

    useEffect(() => {
        console.log("once useEffect");
    }, []);

    useEffect(() => {
        console.log("count useEffect");
    }, [count]);

    useEffect(() => {
        console.log("one useEffect");

        return () => {
            console.log("cleanup");
        }
    }, [one])

    return (
        <div>
            <h2>{count}</h2>
            <h2>{one}</h2>
        </div>
    )
}

export default Counter
