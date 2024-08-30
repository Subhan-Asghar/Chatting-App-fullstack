import React, { useState, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import UserContext from "../context/user_context";

const Chat = () => {
  const { setuser } = useContext(UserContext);
  const [socket, setSocket] = useState(null); 
  const [message, setMessage] = useState(''); 
  const [messages, setMessages] = useState([]); 
  const [username, setUsername] = useState(''); 
  const [hasUsername, setHasUsername] = useState(false); 

  useEffect(() => {
    
    const newSocket = io('http://localhost:3000'); 
    setSocket(newSocket);

    newSocket.on('message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []); 

  const sendMessage = () => {
    if (message && socket && username) {
      socket.emit('message', { username, message });
      setMessage(''); 
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleUsernameSubmit = () => {
    if (username) {
      setHasUsername(true);
    }
  };

  const logout = () => {
    setuser(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
        {!hasUsername ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">Enter Your Username</h2>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg mb-4"
              placeholder="Enter your username..."
              value={username}
              onChange={handleUsernameChange}
            />
            <button
              onClick={handleUsernameSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Set Username
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">Chat</h2>
            <div className="flex flex-col space-y-2 overflow-y-auto max-h-60 mb-4">
              {messages.map((msg, index) => (
                <div key={index} className="p-2 bg-gray-200 rounded-lg">
                  <strong>{msg.username}:</strong> {msg.message}
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                className="flex-1 px-4 py-2 border rounded-lg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Send
              </button>
            </div>
            <button
              onClick={logout}
              className="bg-black text-white mt-4 w-full py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
