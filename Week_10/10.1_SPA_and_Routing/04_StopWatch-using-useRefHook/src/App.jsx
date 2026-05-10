import { useRef, useState } from 'react'
import './App.css'

function App() {
  const [currentCount, setCurrentCount] = useState(0)
  const timer = useRef();

  const startClock = () => {
    let value = setInterval(() => {
      setCurrentCount(c => c + 1)
    }, 1000);
    timer.current = value
  }
  const stopClock = () => {
    clearInterval(timer.current)
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", flexDirection: "column" }}>
      <h1>Stopwatch using useRef Hook</h1>
      <div>
        <h3>
          {currentCount}
        </h3>
      </div>
      <div>
        <button onClick={startClock}>Start Clock</button>
        <button onClick={stopClock}>Stop Clock</button>
      </div>
    </div>
  )
}

export default App
