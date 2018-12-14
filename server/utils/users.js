//class Person{
//    constructor(name, age){
//        this.name = name;
//        this.age = age;
//    }
//    getUserDescription(){
//        return `${this.name} is ${this.age} years old`;
//    }
//}
//
//var cpt = new Person('CPT', 25);
//console.log(cpt.getUserDescription());

class Users{
    constructor(){
        this.users = [];
    }
    
    addUser(id, name, room){
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }
    
    removeUser(id){
        var user = this.users.filter((user)=>{
            return user.id === id;
        })[0];
//        var user = this.getUser(id);
        if(user){
            this.users = this.users.filter((user)=>{
                return user.id !== id;
            });    
        }
        return user;
    }
    
    getUser(id){
        
        return this.users.filter((user)=>{
            return user.id === id;
        })[0];
    }
    
    getUserList(room){
        var users = this.users.filter((user)=>{
            return user.room === room;
        });
        
        var namesArray = users.map((user)=>{
            return user.name;
        });
        
        return namesArray;
    }
    
}

module.exports = {Users};