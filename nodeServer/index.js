//node server which will hendlesocket io connections
const io = require('socket.io')(8000)

const users = {};

io.on('connections',socket=>{
    socket.on('new-user-joined', name =>{
        console.log("New user" , name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    socket.on('send', message=>{
        socket.broadcaast.emit('receive',{message:message, name: users[socket.id]}) 
    });
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})


