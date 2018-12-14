const expect = require('expect');
const {isRealString} = require("./validate.js");

describe('isRealString', ()=>{
    it('Should reject non-string values', ()=>{
        var str = 123;
        expect(isRealString(str)).toBe(false);
    });
    
    it('Should reject string with only spaces', ()=>{
        var str = "      ";
        expect(isRealString(str)).toBe(false);
    });
    
    it('Should allow string with non-space characters', ()=>{
        var str = "Hello";
        expect(isRealString(str)).toBe(true);
    });
    
});
