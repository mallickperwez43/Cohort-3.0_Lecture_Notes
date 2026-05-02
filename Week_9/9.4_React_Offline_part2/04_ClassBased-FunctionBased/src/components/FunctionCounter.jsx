import React, { useState } from 'react'

const FunctionCounter = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count => count + 1)
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: "tan", padding: 10, margin: 10, border: "3px solid white", borderRadius: 10 }} >
            <p><b>Function_Based_Counter</b></p>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    )
}

export default FunctionCounter
