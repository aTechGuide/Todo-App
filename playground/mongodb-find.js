//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  if (err) {
    console.log('Unable to connect to MongoDB Server');
    return;
  }
  console.log('Connected to MongoDB Server');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5aed7e001fefbfc74eb7db31')
  // }).toArray().then((docs) => {
  //   console.log('TODOS');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err)
  // })

  db.collection('Todos').find().count().then((count) => {
    console.log(`TODOS count: ${count} `);
  }, (err) => {
    console.log('Unable to fetch todos', err)
  })

  // db.close();
} );