import { Server } from 'socket.io'
import http from 'http'

let io;
let userSoketMap = {}

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('a user connected', socket.id)

    const userId = socket.handshake.query.userId
    if (userId) userSoketMap[userId] = socket.id
    io.emit('onlineUsers', Object.keys(userSoketMap))

    socket.on('disconnect', () => {
      console.log('a user disconnected', socket.id)
      delete userSoketMap[userId]
      io.emit('onlineUsers', Object.keys(userSoketMap))
    })
  });
}

export function getResponseSocket(userId) {
  return userSoketMap[userId]
}

export { io }
