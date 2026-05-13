import React from 'react'

const ToggleBulbState = ({ bulbOn, setBulbOn }) => {

    const toggle = () => {
        setBulbOn(bulbOn => !bulbOn);
    }

    return (
        <div>
            <button onClick={toggle}>Toggle the bulb</button>
        </div>
    )
}

export default ToggleBulbState
