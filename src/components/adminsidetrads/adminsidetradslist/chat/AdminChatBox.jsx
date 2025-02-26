// AdminChatBox.jsx
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Tradesuser from '../../trads/Tradesuser';

// Hard-coded admin and target user details
const adminId = 'A1';
const adminUsername = 'Admin';
// const targetUserId = 'U1';

const AdminChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);
  const location = useLocation();
  const { userId } = location.state || {};
  const [targetUserId, setTargetUserId] = useState(userId);
console.log("User in admin side ID",userId);
const userdata = useSelector(state => state);
// console.log("User Profile",useSelector(state => state));
console.log(" admin Profile id",userdata.userAuth.user.user_id);
// const [adminId, setAdminId] = useState(userdata.userAuth.user.user_id);

  useEffect(() => {
    // Establish a single socket connection
    socketRef.current = io('https://crms-chat-backend.onrender.com');

    // Fetch all messages for this conversation
    fetch('https://crms-chat-backend.onrender.com/api/chats')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (msg) =>
            (msg.userId === adminId && msg.targetUserId === targetUserId) ||
            (msg.userId === targetUserId && msg.targetUserId === adminId)
        );
        setMessages(filtered);
      })
      .catch((err) => console.error('Error fetching chats:', err));

    // Listen for real-time messages for this conversation
    socketRef.current.on('receive_message', (allMessages) => {
      const filtered = allMessages.filter(
        (msg) =>
          (msg.userId === adminId && msg.targetUserId === targetUserId) ||
          (msg.userId === targetUserId && msg.targetUserId === adminId)
      );
      setMessages(filtered);
    });

    // Clean up on unmount
    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const messageData = {
        author: adminUsername,
        message: input.trim(),
        userId: adminId,
        targetUserId: targetUserId,
      };
      socketRef.current.emit('send_message', messageData);
      setInput('');
    }
  };

  return (
    <div className='flex ' >
      
    <div
      className={`
        min-h-screen w-full
        flex items-center justify-center
        bg-[radial-gradient(circle,_#1a4db4_0%,_#253352_40%,_#1a202c_100%)]
        text-white
      `}
    >
      <div className="ml-80  w-80 h-96 border-2 shadow-2xl shadow-blue-400  border-blue-700 rounded flex flex-col">
        {/* Chat Messages Container */}
        <div className="flex-1 p-3 overflow-y-auto bg-blue-950 text-black">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex mb-2 ${
                  msg.author === adminUsername ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={` p-2 rounded max-w-[80%] break-words ${
                    msg.author === adminUsername
                      ? 'bg-blue-500 text-white rounded-bl-none'
                      : 'bg-gray-300 text-black rounded-br-none'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">
              No messages found for this conversation.
            </p>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="flex border-t border-blue-800 ">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 outline-none text-gray-300 bg-blue-950"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
    <div className='lg:mr-28 lg:pr20'>

     <Tradesuser />
    </div>
    </div>
  );
};

export default AdminChatBox;
