import './App.css'
import ClassCounter from './components/ClassCounter'
import FunctionCounter from './components/FunctionCounter'

function App() {

  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: 10, margin: 10, backgroundColor: "#888" }}>
      <ClassCounter />
      <FunctionCounter />
    </div>
  )
}

export default App
