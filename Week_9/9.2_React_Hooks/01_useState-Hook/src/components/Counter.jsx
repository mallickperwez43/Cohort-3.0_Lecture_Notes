import React, { useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0);

    const increaseCount = () => {
        setCount(count + 1);
    };

    const decreaseCount = () => {
        setCount(count - 1);
    };
    const resetCount = () => {
        setCount(0);
    };

    return (
        <div>
            <h2>{count}</h2>
            <button onClick={increaseCount}>Increment</button>
            <button onClick={decreaseCount}>Decrement</button>
            <button onClick={resetCount}>Reset</button>
        </div>
    )
}

export default Counter
