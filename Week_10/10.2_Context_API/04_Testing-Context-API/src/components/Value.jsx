import React, { useContext } from 'react'
import { CountContext } from '../context/CountContextProvider'

const Value = () => {

    const { count } = useContext(CountContext);

    return (
        <div>
            <p>Count:: {count}</p>
        </div>
    )
}

export default Value
