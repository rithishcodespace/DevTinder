import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([
    { message: "What kind of nonsense is this", self: false },
    { message: "Calm down, Anakin.", self: true }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    setMessages([...messages, { message: inputMessage, self: true }]);
    setInputMessage("");
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto mt-5 p-4 rounded-2xl shadow-md h-[600px] bg-white mb-5 relative">
      <div className="flex items-center justify-between mb-3 border-b pb-2">
        <h2 className="text-lg text-purple-600 font-semibold">Chat with {targetUserId}</h2>
      </div>

      <div className="overflow-y-auto flex-grow mb-16">
        {messages.map((msg, index) => (
          <div key={index} className={`chat ${msg.self ? 'chat-end' : 'chat-start'}`}> 
            <div className={`chat-bubble ${msg.self ? 'chat-bubble-info' : 'chat-bubble-primary'}`}>{msg.message}</div>
          </div>
        ))}
      </div>

      <div className="flex space-x-2 absolute bottom-0 left-0 right-0 p-4 bg-white">
        <input 
          type="text" 
          value={inputMessage} 
          onChange={(e) => setInputMessage(e.target.value)} 
          placeholder="Type a message..." 
          className="input input-bordered flex-grow" 
        />
        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
