import React, { useState, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import UserContext from "../context/user_context";

const Chat = () => {
  const { setuser, name } = useContext(UserContext);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

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
    if (message && socket && name) {
      socket.emit('message', { name, message });
      setMessage('');
    }
  };

  const logout = () => {
    setuser(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Chat</h2>
        <div className="flex flex-col space-y-4 overflow-y-auto max-h-60 mb-4 p-2 bg-gray-100 rounded-lg border border-gray-300">
          {messages.map((msg, index) => (
            <div key={index} className="p-2 bg-gray-200 rounded-lg">
              <strong className="text-gray-800">{msg.name}:</strong> {msg.message}
            </div>
          ))}
        </div>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send
          </button>
        </div>
        <button
          onClick={logout}
          className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Chat;
