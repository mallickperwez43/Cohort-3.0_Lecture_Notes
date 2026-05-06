import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Class11Program from './components/Class11Program';
import Class12Program from './components/Class12Program';
import Landing from './components/Landing';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/neet/online-coaching-class-11' element={<Class11Program />} />
          <Route path='/neet/online-coaching-class-12' element={<Class12Program />} />
          <Route path='/' element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
