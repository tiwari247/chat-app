const expect = require("expect");
var {generateMessage,generateLocationMessage} = require("./message.js");

describe("generateMessage", ()=>{
    it("should generate correct message object", ()=>{
        var from = "CPT";
        var text = "How are you";
        
        var message = generateMessage(from, text);
        
        expect(message).toInclude({from,text});
        expect(message.createdAt).toBeA('number');
        
    });
});

describe('generateLocationMessage', ()=>{
   it('Should generate correct location message', ()=>{
       var from = "Name";
       var lat = 100;
       var long = 200;
       
       var locationMessage = generateLocationMessage(from,lat,long);
       
       expect(locationMessage).toInclude({
           from,
           url: `http://google.com/maps?q=${lat},${long}`
       });
       
       expect(locationMessage.createdAt).toBeA('number');
       
   }); 
});