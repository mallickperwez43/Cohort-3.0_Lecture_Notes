import React from 'react'
import CountContextProvider from '../context/CountContextProvider'
import Value from './Value'
import Increase from './Increase'
import Decrease from './Decrease'

const Parent = () => {
    return (
        <div>
            <CountContextProvider>
                <Value />
                <Increase />
                <Decrease />
            </CountContextProvider>
        </div>
    )
}

export default Parent
