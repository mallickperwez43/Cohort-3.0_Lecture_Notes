import './App.css'
import useFetch from './hooks/useFetch'

function App() {
  const { finalData, error, reqFetched, id, setId } = useFetch("https://jsonplaceholder.typicode.com/posts/", 5000);

  if (!reqFetched) return <div>Loading...</div>;

  return (
    <div>
      <p>Currently viewing Post: <strong>{id}</strong> (Rotating every 5s)</p>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {[1, 2, 3, 4, 5].map(num => (
          <button
            key={num}
            onClick={() => setId(num)}
            style={{ backgroundColor: id === num ? "indigo" : "", color: id === num ? "white" : "black" }}
          >
            Post {num}
          </button>
        ))}
      </div>

      <div>
        {!reqFetched && <div>Loading...</div>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {reqFetched && !error && (
          <pre>{JSON.stringify(finalData, null, 2)}</pre>
        )}
      </div>
    </div>
  )
}

export default App
