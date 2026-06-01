import React, { useState } from 'react'

const useCounter = () => {
    const [count, setCount] = useState(0);

    const increaseCnt = () => {
        setCount(c => c + 1);
    }

    return {
        count, increaseCnt
    }
}

export default useCounter
