var socket = io();
socket.on('connect', ()=>{
    console.log("Connected to server");

    socket.emit("createMessage",{
        to : "Andrew",
        text : "How are you?"
    });

});
socket.on('disconnect', ()=>{
    console.log("Disconnected from server");
});

socket.on("newMessage", (message)=>{
    console.log(message);
});