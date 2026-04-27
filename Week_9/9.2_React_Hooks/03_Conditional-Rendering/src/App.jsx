import { useEffect, useState } from 'react'
import './App.css'
import Counter from './components/Counter'

function App() {
  const [counterVisible, setCounterVisible] = useState(true);

  useEffect(() => {
    let watch = setInterval(() => {
      setCounterVisible(counterVisible => !counterVisible);
    }, 5000);
    console.log("Counter Mounted")

    return () => {
      clearInterval(watch);
      console.log("Counter Unmounted");
    }
  }, []);

  return (
    <div>
      <h1>Conditional Rendering</h1>

      {counterVisible && <Counter />}
    </div>
  )
}

export default App
