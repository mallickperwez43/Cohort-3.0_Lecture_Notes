import React, { useContext, createContext, useState } from 'react'

export const CountContext = createContext();

const CountContextProvider = ({ children }) => {
    const [count, setCount] = useState(0);

    return <CountContext.Provider value={{
        count: count,
        setCount: setCount
    }}>
        {children}
    </CountContext.Provider>
}

export default CountContextProvider
