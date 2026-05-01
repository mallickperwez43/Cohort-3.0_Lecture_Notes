import { useEffect, useState } from 'react'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  // const increaseCount = () => {
  //   setCount(count => count + 1);
  // };

  // useEffect(() => {
  //   console.log("Above setinterval")
  //   let clock = setInterval(increaseCount, 1000);

  //   return () => {
  //     clearInterval(clock);
  //     console.log("Clean up called")
  //   }
  // }, [count]);

  // return (
  //   <div>
  //     {count}
  //   </div>
  // )


  const [currentTab, setCurrentTab] = useState(1);
  const [tabData, setTabData] = useState({});

  useEffect(() => {
    // send a backend request to your server api
    console.log(`Api request for tab: ${currentTab}`);
    fetch(`https://jsonplaceholder.typicode.com/todos/${currentTab}`)
      .then((res) => res.json()) // Standard way to parse JSON
      .then((json) => {
        setTabData(json);
      });
  }, [currentTab]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
      <div style={{ display: "flex", gap: "5px" }}>
        {[1, 2, 3, 4].map((num) => (
          <button
            key={num}
            onClick={() => setCurrentTab(num)}
            style={{ color: currentTab === num ? 'red' : 'black' }}
          >
            Todo #{num}
          </button>
        ))}
      </div>

      {tabData.id && (
        <div>
          <div>Id : {tabData.id}</div>
          <div>Title : {tabData.title}</div>
          <div>Completed : {String(tabData.completed)}</div>
        </div>
      )}
    </div>
  )
}

export default App
