const moment = require('moment');

var date = moment();

date.add('8','minutes');

console.log(date.format('hh:mm a'));
console.log(date.format('h:mm a'));