const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var message = 'Kamran Ali';
var hash = SHA256(message).toString();

//console.log(hash);

var data = {
  id: 4
};

var token = jwt.sign(data, '123abc');
// console.log(token);

var decoded = jwt.verify(token, '123abc')
//console.log(decoded);


var password = '123abc!';
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   })
// });

var hashedPassword = '$2a$10$NxdWjSNeJjvma7AZQJyssOD33sZnYScyTZUKjrHdISOATIUU1u6Wm';
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
})



