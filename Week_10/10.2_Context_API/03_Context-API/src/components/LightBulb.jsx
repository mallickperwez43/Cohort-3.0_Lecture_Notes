import React, { useContext } from 'react'
import { BulbContext } from '../context/BulbProvider'

const LightBulb = () => {

    const { bulbOn } = useContext(BulbContext);

    return (
        <div>
            {bulbOn ? "Bulb is on" : "Buld turned off"}
        </div>
    )
}

export default LightBulb