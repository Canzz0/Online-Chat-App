import React from 'react';
import './Room.css';

const Room = ({ username, room, setUsername, setRoom, setChatScreen, socket }) => {
  const sendRoom = () => {
    socket.emit('room', room);
    setChatScreen(true);
  };

  return (
    <div className='room-container'>
      <h1 className='room-title'>WELCOME TO CHAT</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='room-input'
        type='text'
        placeholder='UserName'
      />
      <input
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        className='room-input'
        type='text'
        placeholder='Room'
      />
      <button onClick={sendRoom} className='room-button'>
        CHAT!!
      </button>
    </div>
  );
};

export default Room;
