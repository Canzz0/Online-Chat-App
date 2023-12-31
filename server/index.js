
// Tanımlama işlemleri
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods:['GET','POST']
    }
})
io.on('connection',(socket)=> {
    console.log(socket.id);
    
    socket.on('room',(roomdata)=> {
        socket.join(roomdata);
    })
    
    socket.on('message',(messagedata)=>{
        socket.to(messagedata.room).emit('returnMessage',messagedata)
    })
})
const PORT = 5000;

server.listen(PORT, ()=>{
    console.log('Server:'+ PORT +' Üzerinde Ayakta')
})