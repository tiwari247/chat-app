var socket = io();
socket.on('connect', ()=>{
    console.log("Connected to server");
});

socket.on('disconnect', ()=>{
    console.log("Disconnected from server");
});

function scrollToBottom(){
    var messages = jQuery("#messages");
    var newMessage = messages.children('li:last-child');
    
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
    
    
    
}

socket.on("newMessage", (message)=>{
//    console.log(message);
    
    var formattedDate = moment().format("h:mm a"); 
    
//    var li = jQuery("<li></li>");
//    li.text(`${formattedDate}> ${message.from}: ${message.text}`);
//    
//    jQuery("#messages").append(li);
    
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedDate
    });
    jQuery("#messages").append(html);
    
    scrollToBottom();
    
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    
    if(jQuery('[name=message]').val() !== '' ){
        socket.emit("createMessage", {
        from : "User",
        text : jQuery('[name=message]').val()
        }, ()=>{
            jQuery('[name=message]').val('');
        });   
    }
});

socket.on('newLocationMessage', function(location){
    
    var formattedDate = moment().format("h:mm a");
    
//    var li = jQuery("<li></li>");
//    var a = jQuery("<a target=_blank>My Current Location</a>");
//    li.text(`${formattedDate}> ${location.from}: `);
//    a.attr('href',location.url);
//    li.append(a);
    
    var template = jQuery("#location-message-template").html();
    var html = Mustache.render(template,{
        from: location.from,
        createdAt: formattedDate,
        url: location.url
    });
    
    jQuery("#messages").append(html);
    
    scrollToBottom();
    
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




//socket.emit("createMessage",{
//        to : "Andrew",
//        text : "How are you?"
//}, (data)=>{
//    console.log("got it : ",data);
//});
