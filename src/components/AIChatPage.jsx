import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchChatHistory, sendChatMessage } from '../services/apiService';

const AIChatPage = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState({});
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const loadChat = async () => {
      const data = await fetchChatHistory(artistId);
      setArtist(data.artist);
      setMessages(data.messages);
    };

    loadChat();
  }, [artistId]);

  const handleSend = async () => {
    const newMessage = await sendChatMessage(artistId, input);
    setMessages([...messages, { text: input, sender: 'user' }, newMessage]);
    setInput('');
  };

  return (
    <div>
      <h1>Chat with {artist.name}</h1>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default AIChatPage;
