import { useState } from 'react';
import io from 'socket.io-client';
import Chat from './Components/Chat/Chat';
import Room from './Components/Room/Room';


const socket = io.connect('http://localhost:5000');

function App() {
  
  const [username,setUsername] = useState('');
  const [room,setRoom] = useState('');
  const [chatScreen,setChatScreen] = useState(false);
  

  return (
    
    <div className="App">
      {
      !chatScreen ?
      <Room username={username} room={room} setUsername={setUsername} setRoom={setRoom} setChatScreen={setChatScreen} socket={socket}/>
        :
        <Chat socket={socket} username={username} room={room}/>
      }
    </div>
  );
}

export default App;
