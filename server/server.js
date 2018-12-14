const express = require("express");
const path = require('path');
const socketIO = require('socket.io');
const http = require("http");
const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require("./utils/validate.js");
const {Users} = require('./utils/users.js');


const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

var finalPath = path.join(__dirname + "/../public");
console.log(finalPath);

io.on('connection', (socket)=>{
    console.log("New user connected");
    
    socket.on('join', (params, callback)=>{
        
        if(!isRealString(params.disp_name) || !isRealString(params.room_id)){
            return callback("Display Name or Room ID cannot be empty!");
        }
        socket.join(params.room_id);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.disp_name, params.room_id);
//        socket.leave(params.room_id);
        
        io.to(params.room_id).emit('updateUserList',users.getUserList(params.room_id));
        
        socket.emit("newMessage", generateMessage('Admin','Welcome to Chat App'));
    
        socket.broadcast.to(params.room_id).emit("newMessage",generateMessage('Admin',`${params.disp_name} Joined!`));
        
        callback();
        
    });
    
    
    
    
    socket.on('disconnect', ()=>{
        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} left`));
        }
        console.log("User disconnected"); 
    });
    
    socket.on('createLocationMessage', (location,callback)=>{
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,location.latitude,location.longitude)); 
            callback();
        }
    });
    
    socket.on("createMessage", (message, callback)=>{
        console.log(message);
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit("newMessage", generateMessage(user.name,message.text));
            callback("This is from the server!");    
        }
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