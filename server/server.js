const express = require("express");
const path = require('path');
const socketIO = require('socket.io');
const http = require("http");

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
var io = socketIO(server);

var finalPath = path.join(__dirname + "/../public");
console.log(finalPath);

io.on('connection', (socket)=>{
    console.log("New user connected");
    
    socket.emit("newMessage",{
        from : "Admin",
        text: "Welcome to Chat App"
    });
    
    socket.broadcast.emit("newMessage",{
        from : "Admin",
        text: "New User joined!"
    });
    
    socket.on('disconnect', ()=>{
       console.log("User disconnected"); 
    });
    
    socket.on("createMessage", (message)=>{
        //console.log(message);
        io.emit("newMessage", {
            from : message.to,
            text: message.text,
            createdAt: new Date().getTime()
        });
//        socket.broadcast.emit("newMessage", {
//            from: message.to,
//            text : message.text,
//            createdAt : new Date().getTime()
//        });
    });
    
    socket.emit("newMessage",{
        from : "cpt",
        text : "what's going on",
        createdAt : new Date().getTime()
    });
    
});


app.use(express.static(finalPath));



server.listen(port,()=>{
    console.log(`Started at ${port}`);
});