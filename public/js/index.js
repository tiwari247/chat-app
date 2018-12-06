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

socket.on('newLocationMessage', function(location){
    var li = jQuery("<li></li>");
    var a = jQuery("<a target=_blank>My Current Location</a>");
    li.text = `${location.from}: `;
    a.attr('href',location.url);
    li.append(a);
    jQuery("#messages").append(li);
});

jQuery("#location-message").on('click', function(){
    if(!navigator.geolocation){
        return alert("This feature not supported on your browser!");
    }
    
    navigator.geolocation.getCurrentPosition(function(location){
        //http://google.com/maps?q=28.597076899999998,77.34130680000001
//        console.log(location.coords.latitude);
//        console.log(location.coords.longitude);
        
        socket.emit("createLocationMessage",{
            from: "User",
            latitude : location.coords.latitude,
            longitude : location.coords.longitude
        });
        
    },function(err){
        console.log("Unable to fetch location",err)
    });
    //navigator.geolocation.
});

