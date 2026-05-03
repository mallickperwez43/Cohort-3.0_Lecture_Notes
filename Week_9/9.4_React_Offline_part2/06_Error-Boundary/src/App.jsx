import './App.css'
import ErrorBoundary from './components/ErrorBoundary'
import Card1 from './components/Card1'
import Card2 from './components/Card2'

function App() {

  return (
    <div>
      <ErrorBoundary>
        <Card1 />
      </ErrorBoundary>
      <ErrorBoundary>
        <Card2 />
      </ErrorBoundary>
    </div >
  )
}

export default App
