import React, { useState, createContext } from 'react'

export const BulbContext = createContext();

const BulbProvider = ({ children }) => {
    const [bulbOn, setBulbOn] = useState(true);

    return <BulbContext.Provider value={{
        bulbOn: bulbOn,
        setBulbOn: setBulbOn
    }}>
        {children}
    </BulbContext.Provider>
}

export default BulbProvider
