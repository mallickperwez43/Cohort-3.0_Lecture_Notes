import React from 'react'
import useCounter from '../hooks/useCounter';

const Counter = () => {
    const { count, increaseCnt } = useCounter();

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <button onClick={increaseCnt}>Increase: {count}</button>
        </div>
    )
}

export default Counter
