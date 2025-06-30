
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.static(__dirname));

io.on('connection', socket => {
    console.log("User connected");

    socket.on("join", ({ room, username }) => {
        socket.join(room);
        socket.to(room).emit("chat", { name: "System", message: `${username} has joined the room.` });
    });

    socket.on("chat", ({ room, name, message }) => {
        io.to(room).emit("chat", { name, message });
    });

    socket.on("rom", ({ room, rom }) => {
        socket.to(room).emit("rom", { rom });
    });

    socket.on("signal", ({ room, data }) => {
        socket.to(room).emit("signal", data);
    });

    socket.on("disconnecting", () => {
        const rooms = [...socket.rooms].filter(r => r !== socket.id);
        rooms.forEach(room => socket.to(room).emit("chat", { name: "System", message: "A user has disconnected." }));
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
