import {Server} from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()
const server = http.createServer(app)
const io = new Server(server , {
cors: {
    origin: 'http://localhost:5173',
},
})
export function getUserSocketId(userId) {
    return users[userId]
}
const users = {}

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
    const userId = socket.handshake.query.userId
    if(userId) users[userId] = socket.id
    io.emit('onlineUsers' , Object.keys(users))
    socket.on('disconnect', () => {
        console.log('user disconnected' , socket.id);
        delete users[userId];
        io.emit('onlineUsers' , Object.keys(users))
      });
})
export  {io , app , server}