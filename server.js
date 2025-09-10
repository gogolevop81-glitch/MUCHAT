const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Раздаём статику (твой клиентский чат)
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Пользователь подключился:', socket.id);

  socket.on('chat message', (msg) => {
    // Рассылаем сообщение всем кроме отправителя
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Пользователь отключился:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});