import './App.css'
import PostComponent from './components/PostComponent'

function App() {

  return (
    <div>
      <div style={{ backgroundColor: "#dfe6e9", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "10px" }}>
        <PostComponent />
        <PostComponent />
      </div>
    </div>
  )
}

export default App
