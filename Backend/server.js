const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/user_route'); 
const http = require('http'); 
const { Server } = require('socket.io');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/chat', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Create HTTP server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
  },
});

let users = {};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join', (name) => {
    users[socket.id] = name; 
    console.log(`${name} has joined the chat.`);
    io.emit('user-joined', { id: socket.id, name }); // Notify other users
  });

  socket.on('message', (data) => {
    console.log(`Message received: ${data}`);
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    const name = users[socket.id];
    delete users[socket.id];
    io.emit('user-left', { id: socket.id, name }); // Notify other users
  });
});

app.use('/', router);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
