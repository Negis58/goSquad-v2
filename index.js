const express = require('express');
const config = require('config');
const connectDB = require('./config/db');
const path = require('path');

const authRoute = require('./routes/authRoutes');
const userRoute = require('./routes/userRoutes');
const postRoute = require('./routes/postRoutes');
const chatRoute = require('./routes/chatRouter');
const bodyParser = require('body-parser');
const http = require('http');
const socketio = require('socket.io');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./services/chatUserService');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 5000;
const cors = require('cors');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB().then(() => console.log('MongoDB connected...'));


app.use(cors());

app.use('/api',  userRoute);
app.use('/api', authRoute);
app.use('/api',  postRoute);
app.use(chatRoute);


if (process.env.NODE_ENV === "production") {
    console.log('123')

    app.use(express.static(path.join(__dirname, './client/build')));

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, './client/build', 'index.html'));
    });
}
io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) return callback(error);

        socket.join(user.room);
        console.log(user.room)

        socket.emit('message', { user: 'Админ', text: `${user.name}, добро пожаловать в комнату ${user.room}.`});
        socket.broadcast.to(user.room).emit('message', { user: 'Админ', text: `${user.name} присоединился!` });

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} Отсоединился.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    })
});

server.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
