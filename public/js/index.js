var socket = io();
socket.on('connect', ()=>{
    console.log("Connected to server");
});

socket.on('disconnect', ()=>{
    console.log("Disconnected from server");
});

socket.on("newMessage", (message)=>{
//    console.log(message);
    
    var formattedDate = moment().format("h:mm a"); 
    
    var li = jQuery("<li></li>");
    li.text(`${formattedDate}> ${message.from}: ${message.text}`);
    
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
        jQuery('[name=message]').val('');
    });
});

socket.on('newLocationMessage', function(location){
    
    var formattedDate = moment().format("h:mm a");
    
    var li = jQuery("<li></li>");
    var a = jQuery("<a target=_blank>My Current Location</a>");
    li.text(`${formattedDate}> ${location.from}: `);
    a.attr('href',location.url);
    li.append(a);
    jQuery("#messages").append(li);
});

jQuery("#location-message").on('click', function(){
    if(!navigator.geolocation){
        return alert("This feature not supported on your browser!");
    }
    console.log("Clicked");
    
    jQuery("#location-message").attr('disabled','disabled').text('Fetching...');
    //jQuery("#location-message").disabled = true;
    navigator.geolocation.getCurrentPosition(function(location){
        //http://google.com/maps?q=28.597076899999998,77.34130680000001
//        console.log(location.coords.latitude);
//        console.log(location.coords.longitude);
        
        socket.emit("createLocationMessage",{
            from: "User",
            latitude : location.coords.latitude,
            longitude : location.coords.longitude
        }, ()=>{
            console.log('got it');
            jQuery("#location-message").removeAttr('disabled').text('Send Location');
        });
    },function(err){
        jQuery("#location-message").removeAttr('disabled').text('Send Location');
        console.log("Unable to fetch location",err)
        alert('Unable to fetch location');
    });
    //navigator.geolocation.
});

