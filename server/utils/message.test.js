const expect = require("expect");
var {generateMessage} = require("./message.js");

describe("generateMessage", ()=>{
    it("should generate correct message object", ()=>{
        var from = "CPT";
        var text = "How are you";
        
        var message = generateMessage(from, text);
        
        expect(message).toInclude({from,text});
        expect(message.createdAt).toBeA('number');
        
    });
});