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
    
    socket.on('disconnect', ()=>{
       console.log("User disconnected"); 
    });
    
    socket.on("createMessage", (message)=>{
        console.log(message);
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