import React, { useEffect, useState } from 'react';
import './Chat.css';

const Chat = ({ socket, username, room }) => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on('returnMessage', (messagedata) => {
      setMessageList((prev) => [...prev, messagedata]);
    });
  }, [socket]);

  const sendMessage = async () => {
    const messageContent = {
      username: username,
      message: message,
      room: room,
      date: `${new Date().getHours()}:${new Date().getMinutes()}`,
    };
    await socket.emit('message', messageContent);
    setMessageList((prev) => [...prev, messageContent]);
    setMessage('');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chatting</div>
      <div className="chat-messages">
        {messageList.map((msg, index) => (
          <div key={index} className={`message ${username === msg.username ? 'message-sender' : 'message-receiver'}`}>
            <div className="message-content">{msg.message}</div>
            <div className="message-username">-{msg.username}</div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-input"
          type="text"
          placeholder="Type a message"
        />
        <button onClick={sendMessage} className="send-button">
          Gönder
        </button>
      </div>
    </div>
  );
};

export default Chat;
