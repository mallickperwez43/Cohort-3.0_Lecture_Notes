import React, { useContext } from 'react'
import { CountContext } from '../context/CountContextProvider'

const Increase = () => {
    const { setCount } = useContext(CountContext);

    return (
        <button onClick={() => setCount(c => c + 1)}>
            Increase
        </button>
    )
}

export default Increase
