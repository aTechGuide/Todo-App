# Todo API

This APP is build while completing [this](https://www.udemy.com/the-complete-nodejs-developer-course-2) course on NodeJS

# API Guide
## Todo APIs
GET http://localhost:3000/todos  

GET http://localhost:3000/todos/{id}  

POST http://localhost:3000/todos  
```
{
	"text": "My First TODO Item"
}
```

PATCH http://localhost:3000/todos/{id}  
```
{
	"text": "My First TODO Item"
}
```
DELETE http://localhost:3000/todos/{id}  

## User APIs

POST http://localhost:3000/users  
```
{
	"email": "abc6@abc.com",
	"password": "123456!"
}
```

GET http://localhost:3000/users/me  
HEADER 'x-auth: token'

POST http://localhost:3000/users/login 
```
{
	"email": "abc@abc.com",
	"password": "123456!"
}
```

# Commands
To start App ``` node server/server.js ```

To run Specific Test ``` npm test -- -g 'POST /users' ```

# References
[Mongoose Validation](http://mongoosejs.com/docs/validation.html)
