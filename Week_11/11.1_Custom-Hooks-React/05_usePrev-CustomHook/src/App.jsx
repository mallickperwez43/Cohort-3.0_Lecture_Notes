import { useState } from 'react'
import './App.css'
import usePrev from './hooks/usePrev';

function App() {
  const [value, setValue] = useState(0);
  const prev = usePrev(value);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "3vh", flexDirection: "column", height: "100vh" }}>
      <p>{value}</p>
      <div style={{ display: "flex", gap: "20px" }}>
        <button onClick={() => {
          setValue(c => c + 1);
        }}>
          Increment
        </button>
        <button onClick={() => {
          setValue(c => c - 1);
        }}>
          Decrement
        </button>
      </div>
      <p>Prev value was : <strong>{prev}</strong></p>
    </div>
  )
}

export default App
