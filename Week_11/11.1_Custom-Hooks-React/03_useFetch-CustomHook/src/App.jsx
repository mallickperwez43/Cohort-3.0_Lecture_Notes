import { useState } from 'react';
import './App.css'
import useFetch from './hooks/useFetch'

function App() {
  const [currPost, setCurrPost] = useState(1);
  const { finalData, error, reqFetched } = useFetch("https://jsonplaceholder.typicode.com/posts/" + currPost);

  if (!reqFetched) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", gap: 150 }}>
        <button onClick={() => setCurrPost(1)}>Post 1</button>
        <button onClick={() => setCurrPost(2)}>Post 2</button>
        <button onClick={() => setCurrPost(3)}>Post 3</button>
        <button onClick={() => setCurrPost(4)}>Post 4</button>
        <button onClick={() => setCurrPost(5)}>Post 5</button>
      </div>

      <div>
        {error && <p style={{ color: "red" }}>An error occurred: {error}</p>}
        {!error && <pre>
          {JSON.stringify(finalData, null, 2)}
        </pre>}
      </div>
    </div>
  )
}

export default App
