import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import AppRoutes from './routes'; // This is your routes/index.jsx

function App() {
  return (
    // Everything that uses <Link> or <Route> MUST be inside this provider
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
