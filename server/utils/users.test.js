const expect = require('expect');
const {Users} = require('./users.js');

describe('Users',()=>{
    var users;
    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id : '1',
            name: "myname1",
            room: 'myroom'
        },{
            id : '2',
            name: "myname2",
            room: 'myroom'
        },{
            id : '3',
            name: "myname3",
            room: 'myroom1'
        }];
    });
    
    it('Should add new user',()=>{
        var users = new Users();
        var testUser = {
            id : '123',
            name : "CPT",
            room: 'myroom'
        };
        var user = users.addUser(testUser.id, testUser.name, testUser.room);
        expect(users.users).toEqual([user]);
    });
    
    it('Should get user list for myroom', ()=>{
        var userList = users.getUserList('myroom');
        expect(userList).toEqual(['myname1', 'myname2']); 
    });
    
    it('Should remove user', ()=>{
        var user = users.removeUser('2');
        expect(user.id).toBe('2');
        expect(users.users.length).toBe(2);
    });
    
    it('Should not remove user', ()=>{
        var user = users.removeUser('5');
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });
    
    it('Should find user', ()=>{
        var user = users.getUser('1');
        expect(user).toEqual({
            id: '1',
            name: 'myname1',
            room: 'myroom'
        });
        
    });
    
    it('Should not find user', ()=>{
        var user = users.getUser('5');
//        expect(user).toEqual([]);
        expect(user).toNotExist();
    });
});