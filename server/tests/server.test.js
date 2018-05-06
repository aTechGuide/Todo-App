const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb'); 

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'Frist Test Todo'
}, {
  _id: new ObjectID(),
  text: 'Second Test Todo'
}]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => {
    done();
  })
});

describe('POST /todos', () => {

  it('Should create a new TODO', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({ text: text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text }).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((err) => {
          done(e);
        })
      })
  });

  it('Should not create a new TODO with invalid body data', (done) => {

    request(app)
      .post('/todos')
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((err) => {
          done(e);
        })
      })
  });
});

describe('GET /todos', () => {
  it('Should GET all TODOs', (done) => {

    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('Should return todo doc', (done) => {

    request(app)
      .get(`/todos/${todos[0]._id.toHexString()} `)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('Should return 404 if Todo not found', (done) => {

    var hexid = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexid}`)
      .expect(404)
      .end(done);
  });

  it('Should return 404 for non Object IDs', (done) => {

    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('Should remove a todo', (done) => {

    var hexid = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexid}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexid);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexid).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });


  })

  it('Should return 404 if todo not found', (done) => {

    var hexid = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexid}`)
      .expect(404)
      .end(done);
  })

  it('Should return 404 if object ID is invalid', (done) => {

    request(app)
    .delete('/todos/123abc')
    .expect(404)
    .end(done);
  })
})