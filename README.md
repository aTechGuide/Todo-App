# To-do App

*Node JS* app providing CRUD operations for Todos' management. To-do created by a user is persisted in Mongo DB. New Users can be Signed up and **encrypted** credentials are persisted in Mongo DB. JWT Token returned after user login is used to authenticate CRUD operations of Todo's.

# API Guide
## Todo APIs

### Create a Todo
POST http://localhost:3000/todos  
HEADER 'x-auth: token'
```
{
	"text": "My First TODO Item"
}
```

### Get All TODOs
GET http://localhost:3000/todos  
HEADER 'x-auth: token'

### Get TODO by ID
GET http://localhost:3000/todos/{id}  
HEADER 'x-auth: token'

## Edit a Todo
PATCH http://localhost:3000/todos/{id}  
HEADER 'x-auth: token'
```
{
	"text": "My First TODO Item"
}
```

## Delete a Todo
DELETE http://localhost:3000/todos/{id}  
HEADER 'x-auth: token'

## User APIs

### Create a User
POST http://localhost:3000/users  
```
{
	"email": "abc6@abc.com",
	"password": "123456!"
}
```
### Get UserName and ID of user
GET http://localhost:3000/users/me  
HEADER 'x-auth: token'

### Login a user
POST http://localhost:3000/users/login 
```
{
	"email": "abc@abc.com",
	"password": "123456!"
}
```

### Logout a user
DELETE http://localhost:3000/users/me/token  
HEADER 'x-auth: token'

# Commands
To start App ``` node server/server.js ```

To run Specific Test ``` npm test -- -g 'POST /users' ```

# References
- [Mongoose Validation](http://mongoosejs.com/docs/validation.html)
- Course [link](https://www.udemy.com/the-complete-nodejs-developer-course-2)
