import LightBulb from './LightBulb';
import LightSwitch from './LightSwitch';

const Light = ({ bulbOn, setBulbOn }) => {

    return (
        <div>
            <LightBulb bulbOn={bulbOn} />
            <LightSwitch bulbOn={bulbOn} setBulbOn={setBulbOn} />
        </div>
    )
}

export default Light