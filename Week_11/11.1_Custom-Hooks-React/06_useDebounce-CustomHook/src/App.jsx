import { useEffect, useState } from 'react';
import './App.css'
import useDebounce from './hooks/useDebounce';

function App() {
  const [input, setInput] = useState("");
  const [joke, setJoke] = useState("");

  const debouncedInput = useDebounce(input, 500);

  const getRandomJoke = async () => {
    if (!debouncedInput) return;

    try {
      const res = await fetch("https://api.chucknorris.io/jokes/random");
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setJoke(data.value);
    } catch (error) {
      console.error("Fetch error:", error);
      setJoke("Failed to fetch joke. Check console.");
    }
  };

  useEffect(() => {
    getRandomJoke();
  }, [debouncedInput]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <h1>Use Debounce Custom Hook</h1>
      <div>
        <h2 style={{ color: "green" }}>Type something to fetch a joke</h2>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder='Search..' size={50} />
      </div>

      {debouncedInput && (
        <div style={{ marginTop: "20px", maxWidth: "400px", textAlign: "center" }}>
          <strong>Joke for "{debouncedInput}":</strong>
          <p>{joke || "Loading..."}</p>
        </div>
      )}

    </div>
  )
}

export default App
