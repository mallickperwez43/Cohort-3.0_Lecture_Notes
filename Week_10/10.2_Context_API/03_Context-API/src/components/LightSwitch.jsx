import React, { useContext } from 'react'
import { BulbContext } from '../context/BulbProvider';

const LightSwitch = () => {

    const { setBulbOn } = useContext(BulbContext);

    const toggle = () => {
        setBulbOn(bulbOn => !bulbOn);
    }

    return (
        <div>
            <button onClick={toggle}>Toggle the bulb</button>
        </div>
    )
}

export default LightSwitch
