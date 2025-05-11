import React, { useState,useEffect,useRef } from 'react';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import Store from '../utils/ReduxStore';

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const socketRef = useRef(null);
  const messageEndRef = useRef(null);
  

  const selector = useSelector((Store) => Store.userSlice);
  const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
  const userId = selector?._id || userDetails._id;


  useEffect(()=>{
    // Establish socket connection only if userId and targetUserId are available
    if(!userId || !targetUserId)return;
    socketRef.current = createSocketConnection();
    socketRef.current.emit("joinChat", { userId, targetUserId });

    // receiving the message -> the message sent by recepient will first reach backend code from that we can get here
    socketRef.current.on("messageReceived",({firstName,text}) => {
      console.log(firstName + " : " + text)
      setMessages((prevMessages) => [
        ...prevMessages,
        { firstName, text, self: true },
      ]);
    })

    // Cleanup socket connection on unmount(this return will be called on unmouting)
    return () => {
       socketRef.current.disconnect();
    }
  },[userId,targetUserId]);

  // Function to send a message
  const sendMessage = () => {
    if (!inputMessage.trim() || !socketRef.current) return;
    socketRef.current.emit("sendMessage",{         // sends the message to the backend
    firstName : selector.firstName,
    userId,
    targetUserId,
    text:inputMessage
  }) 
    // setMessages((prevMessages) => [
    //   ...prevMessages,
    //   { firstName: "You", text: inputMessage, self: true },
    // ]);
    setInputMessage("");
  };

  return (
     <div className='w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col'>
  <h1 className='p-5 border-b border-gray-600'>Chat</h1>
  <div className='flex-1 overflow-y-auto p-5 space-y-3'>
    {messages.map((msg, index) => (
      <div key={index} className={`chat ${msg.self ? 'chat-end' : 'chat-start'}`}>
        <div className='chat-header flex items-center gap-2'>
          <span>{msg.self ? "You" : msg.firstName}</span>
          <time className='text-xs opacity-50'>2 hours ago</time>
        </div>
        <div className='chat-bubble'>{msg.text}</div>
        <div className='chat-footer opacity-50'>Seen</div>
      </div>
    ))}
  </div>

  <div className='p-5 border-t border-gray-600 flex items-center gap-2'>
    <input 
      type="text" 
      className='flex-1 border border-gray-500 text-white rounded p-2'
      value={inputMessage}
      onChange={(e) => setInputMessage(e.target.value)}
    />
    <button className='btn btn-secondary' onClick={sendMessage}>Send</button>
  </div>
</div>
 
  );
};

export default Chat;
