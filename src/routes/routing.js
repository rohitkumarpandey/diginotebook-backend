const express = require('express');
const routes = express.Router();
const registration = require('../services/register');
const loginService = require('../services/login');
const taskService = require('../services/task');

//ping server
routes.get('/pingserver', (request, response)=>{
    return response.status(200).json('pinged server');
});

//login user
routes.post('/login', (request, response, next)=>{
    return loginService.login(request, response);

});


//register user
routes.post('/register', (request, response, next)=>{
    return registration.register(request, response);
});


//add task
routes.post('/addTask/:userid', (request, response)=>{
    return taskService.addTask(request, response);
    
});

//get all task
routes.get('/getTasks/:userid', (request, response, next)=>{
    return taskService.getUserTasks(request, response);

});

//delete task
routes.delete('/deleteTask/:user_id/:task_id', (request, response, next)=>{
    return taskService.deleteTask(request, response);

});

//update Task
routes.put('/updateTask/:task_id', (request, response, next)=>{
    return taskService.updateTask(request, response); 
});

//logout
// router.get('/logout', (request, response)=>{
//     request.logout();
// });




module.exports = routes;