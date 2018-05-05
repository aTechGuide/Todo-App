//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  if (err) {
    console.log('Unable to connect to MongoDB Server');
    return;
  }
  console.log('Connected to MongoDB Server');

  // deleteMany

  // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to delete', err)
  // })

  // deleteOne

  // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to delete', err)
  // })

  // findOneAndDelete
  db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to delete', err)
  })
  
  // db.close();
} );