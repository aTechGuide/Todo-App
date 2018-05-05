//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  if (err) {
    console.log('Unable to connect to MongoDB Server');
    return;
  }
  console.log('Connected to MongoDB Server');

  // findOneAndUpdate
  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5aedcb1ce6d797d8c69199ce')
  }, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to delete', err)
  })
  
  // db.close();
} );