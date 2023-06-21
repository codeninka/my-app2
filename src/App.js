import React, { useState } from 'react';
import './App.css';





function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const getData = async (input = prompt) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/openai?prompt=${input}`);
      const aiResponse = await response.json();
      setResult(aiResponse);
      setLoading(false);
      setError("");
    } catch (e) {
      setError("Oops")
    }
  };


  const handleSend = (event) => {
    event.preventDefault();
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
  }

  const handleChange = (event) => {
    setInput(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Chat with AIplannuh</h2>
        <div className="chatbox">
          {messages.map((message, index) =>
            <p key={index} className={message.sender}>{message.text}</p>
          )}
        </div>
        <form onSubmit={handleSend}>
          <input 
            type="text" 
            value={input} 
            onChange={handleChange}
            placeholder="Type your message..."
            required 
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;