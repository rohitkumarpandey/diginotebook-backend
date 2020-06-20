const express = require('express');
const routes = express.Router();
const registration = require('../services/register');
const loginService = require('../services/login');
const taskService = require('../services/task');
const credentialService = require('../services/credential');

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

//get all pending tasks
routes.get('/getPendingTasks/:userid', (request, response, next)=>{
   
    return taskService.getUserTasks(request, response);

});
//get all completed tasks
routes.get('/getCompletedTasks/:userid', (request, response, next)=>{
   
    return taskService.getCompletedTasks(request, response);

});

//delete task
routes.delete('/deleteTask/:user_id/:task_id', (request, response, next)=>{
    return taskService.deleteTask(request, response);

});

//update Task
routes.put('/updateTask/:task_id', (request, response, next)=>{
    return taskService.updateTask(request, response); 
});

//mark task completed
routes.put('/taskCompleted/:task_id', (request, response, next)=>{
    return taskService.taskCompleted(request, response); 
});

//add credential
routes.post('/addCredential/:user_id', (request, response, next)=>{
    
    return credentialService.addCredential(request, response);

});

//get all credentials
routes.get('/getAllCredentials/:userid', (request, response, next)=>{
   
    return credentialService.getAllCredentials(request, response);

});


//logout
// router.get('/logout', (request, response)=>{
//     request.logout();
// });




module.exports = routes;