const express = require("express");
const path = require('path');
const socketIO = require('socket.io');
const http = require("http");
const {generateMessage, generateLocationMessage} = require('./utils/message.js');

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
var io = socketIO(server);

var finalPath = path.join(__dirname + "/../public");
console.log(finalPath);

io.on('connection', (socket)=>{
    console.log("New user connected");
    
    socket.emit("newMessage", generateMessage('Admin','Welcome to Chat App'));
    
    socket.broadcast.emit("newMessage",generateMessage('Admin','New User Joined!'));
    
    socket.on('disconnect', ()=>{
       console.log("User disconnected"); 
    });
    
    socket.on('createLocationMessage', (location,callback)=>{
        io.emit('newLocationMessage', generateLocationMessage(location.from,location.latitude,location.longitude)); 
        callback();
    });
    
    socket.on("createMessage", (message, callback)=>{
        console.log(message);
        io.emit("newMessage", generateMessage(message.from,message.text));
        callback("This is from the server!");
//        socket.broadcast.emit("newMessage", {
//            from: message.to,
//            text : message.text,
//            createdAt : new Date().getTime()
//        });
    });
    
//    socket.emit("newMessage",generateMessage('CPT',"What's going on?"));
    
});


app.use(express.static(finalPath));



server.listen(port,()=>{
    console.log(`Started at ${port}`);
});