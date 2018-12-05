var socket = io();
socket.on('connect', ()=>{
    console.log("Connected to server");
});

socket.on('disconnect', ()=>{
    console.log("Disconnected from server");
});

socket.on("newMessage", (message)=>{
//    console.log(message);
    var li = jQuery("<li></li>");
    li.text(`${message.from}: ${message.text}`);
    
    jQuery("#messages").append(li);
    
});

//socket.emit("createMessage",{
//        to : "Andrew",
//        text : "How are you?"
//}, (data)=>{
//    console.log("got it : ",data);
//});


jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    
    socket.emit("createMessage", {
        from : "User",
        text : jQuery('[name=message]').val()
    }, ()=>{
        console.log("Got it!")
    });
    
    
    
    
});

