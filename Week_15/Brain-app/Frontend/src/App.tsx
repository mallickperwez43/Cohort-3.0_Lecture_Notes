import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { Dashboard } from './pages/Dashboard'
import { Landing } from './pages/Landing'
import { ProtectedRoute } from './components/ui/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/share/:shareId" element={<Dashboard />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App