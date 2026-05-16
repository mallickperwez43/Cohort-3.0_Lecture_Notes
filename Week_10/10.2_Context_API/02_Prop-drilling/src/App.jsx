import './App.css'
import { useState } from 'react';
import Light from './components/Light'

function App() {
  const [bulbOn, setBulbOn] = useState(true);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <Light bulbOn={bulbOn} setBulbOn={setBulbOn} />
    </div>
  )
}

export default App