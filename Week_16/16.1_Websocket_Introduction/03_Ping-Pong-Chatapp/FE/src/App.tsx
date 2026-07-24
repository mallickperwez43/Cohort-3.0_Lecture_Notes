import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const socketRef = useRef<WebSocket>(null);

  useEffect(() => {
    // 1. Establish connection
    const ws = new WebSocket('ws://localhost:8080');
    socketRef.current = ws;
    // 2. Listen for messages from server
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, `Server: ${event.data}`]);
    };

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socketRef.current && inputValue.trim()) {
      socketRef.current.send(inputValue);
      setMessages((prev) => [...prev, `You: ${inputValue}`]);
      setInputValue("");
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen gap-2'>
      <div className='h-72 w-72 bg-black flex flex-col rounded-xl overflow-hidden'>

        {/* Scrollable Chat Area */}
        <div className='bg-purple-400 flex-1 p-2 overflow-y-auto text-sm'>
          {messages.map((msg, i) => (
            <div key={i} className="mb-1 p-1 bg-white rounded shadow-sm">{msg}</div>
          ))}
        </div>

        {/* Input Area */}
        <div className='flex justify-center p-1 m-1'>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder='Message...'
            className='p-1 m-1 rounded focus:bg-purple-100 bg-purple-500 w-full placeholder-purple-200 outline-none'
          />
          <button
            onClick={sendMessage}
            className='bg-purple-500 p-1 m-1 rounded text-white font-semibold cursor-pointer active:scale-95'
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
