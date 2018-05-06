const {ObjectID} = require('mongodb');

const mongoose = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');

var id = '5aeedd00eacb8d0bea6bd02c';

if (! ObjectID.isValid(id)) {
  console.log('ID not valid')
}

Todo.find({
  _id: id
}).then((todos) => {
  console.log('TODOS ', todos);
})

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('TODO ', todo);
})

Todo.findById(id).then((todo) => {
  console.log('TODO by ID ', todo);
})