import './App.css'
import BulbProvider from './context/BulbProvider'
import Light from './components/Light'

function App() {

  return (
    <BulbProvider>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <Light />
      </div>
    </BulbProvider>
  )
}

export default App