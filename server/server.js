var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var newTodo = new Todo({
    text: req.body.text
  });

  newTodo.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
    console.log('Unable to save Todo', err);
  });

})

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
    console.log('Unable to save Todo', err);
  })
});

app.listen(3000, () => {
  console.log('Started on port 3000');
})

module.exports = {app};

// var newUser = new User({
//   email: 'abc@example.com'
// });

// newUser.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save newUser');
// });