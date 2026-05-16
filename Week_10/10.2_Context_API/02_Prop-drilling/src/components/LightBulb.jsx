import React from 'react'

const LightBulb = ({ bulbOn }) => {

    return (
        <div>
            {bulbOn ? "Bulb is on" : "Buld turned off"}
        </div>
    )
}

export default LightBulb
