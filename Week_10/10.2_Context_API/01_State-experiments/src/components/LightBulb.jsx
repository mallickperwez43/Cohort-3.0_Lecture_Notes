import React, { useState } from 'react'
import BulbState from './BulbState';
import ToggleBulbState from './ToggleBulbState';

const LightBulb = () => {
    const [bulbOn, setBulbOn] = useState(true);
    return (
        <div>
            <BulbState bulbOn={bulbOn} />
            <ToggleBulbState bulbOn={bulbOn} setBulbOn={setBulbOn} />
        </div>
    )
}

export default LightBulb
