const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var message = 'Kamran Ali';
var hash = SHA256(message).toString();

//console.log(hash);

var data = {
  id: 4
};

var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc')
console.log(decoded);

