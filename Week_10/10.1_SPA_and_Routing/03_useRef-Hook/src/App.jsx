import { useRef } from 'react'
import './App.css'

function App() {
  const inputRef = useRef();

  const focusOnInput = () => inputRef.current.focus();

  return (
    <div>
      SignUp <br />
      <input ref={inputRef} type="text" /> <br />
      <input type="text" /> <br />
      <button onClick={focusOnInput}>Submit</button>
    </div>
  )
}

export default App
