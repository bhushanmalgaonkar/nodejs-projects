# TODO API

A REST API written in **ExpressJS/MongoDB** for todo list application

## Todo object model

- **text**: String.

- **completed**: Boolean. 

- **completedAt**: Timestamp. This field is not directly accessible to user. It is automatically set/reset when user marks the todo as completed/not completed.

## There for 5 different endpoints
1. **POST /todos**

   Create a new todo with given text and returns the created object from databse.

2. **GET /todos**

   Retrives a list of all todos

3. **GET /todos/:id**

   Retrieves a todo with matching id. If no such todo exists returns 404.

4. **DELETE /todos/:id**

   Deletes a todo with matching id. If no such todo exists returns 404.

5. **PATCH /todos/:id**

   Updates a todo with matching id. If no such todo exists returns 404.
   
   This endpoint can be used to mark any todo as completed or not completed. In such case, the value of completedAt is set to current time stamp or is cleared out.  
   
## How to run

1. git clone git@github.com:bhushanmalgaonkar/nodejs-projects.git
2. cd nodejs-projects/node-todo-api/
3. npm install
4. npm start
