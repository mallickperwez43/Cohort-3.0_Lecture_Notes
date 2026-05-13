import React, { useState } from 'react'

const BulbState = ({ bulbOn }) => {

    return (
        <div>
            {bulbOn ? "Bulb is on" : "Buld turned off"}
        </div>
    )
}

export default BulbState
