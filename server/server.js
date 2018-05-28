require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  var newTodo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  newTodo.save().then((doc) => {
    // console.log(JSON.stringify(doc, undefined, 2));
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
    // console.log('Unable to save Todo', err);
  });

})

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
    // console.log('Unable to save Todo', err);
  });
});

app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    return res.send({todo});
    
  }).catch((e) => {
    res.status(400).send();
  })
});

app.delete('/todos/:id', authenticate, async (req, res) => {

  try {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    const todo =  await Todo.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    });
  
    if(!todo) {
      return res.status(404).send();
    }
    return res.send({todo});
  } catch (error) {
    res.status(400).send();
  }
});

app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({_id: id, _creator: req.user._id }, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    return res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
})

app.post('/users', async (req, res) => {

  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);

    await user.save();
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/users/login', async (req, res) => {

  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
  
    res.header('x-auth', token).send(user);
  } catch (error) {
    res.status(400).send();
  }
});

app.get('/users/me', authenticate, (req, res) => {

  res.send(req.user);
});

app.delete('/users/me/token', authenticate, async (req, res) => {

  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (error) {
    res.status(400).send();
  }
});

app.listen(port, () => {
  console.log(`Started on port ${port} `);
});

module.exports = {app};