import { useState } from 'react'
import './App.css'
import Counter from './components/Counter'

function App() {
  const [count, setCount] = useState(0);
  const [one, setOne] = useState(1);

  const increase = () => {
    setCount(count + 1);
  };

  const oneCount = () => {
    setOne(one + 1);
  };

  return (
    <div>
      <h1>useEffect Hook (Dependency Array)</h1>
      <Counter count={count} one={one} />
      <button onClick={increase}>Count++</button>
      <button onClick={oneCount}>One++</button>
    </div>
  )
}

export default App
