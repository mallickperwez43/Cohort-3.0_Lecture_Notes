import React, { useContext } from 'react'
import { CountContext } from '../context/CountContextProvider'

const Decrease = () => {
    const { setCount } = useContext(CountContext);

    return (
        <button onClick={() => setCount(c => c - 1)}>
            Decrease
        </button>
    )
}

export default Decrease
