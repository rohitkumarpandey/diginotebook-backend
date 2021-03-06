const express = require('express');
const routes = express.Router();
const isAuthenticated = require('../middleware/authentication');
const registration = require('../services/register');
const loginService = require('../services/login');
const taskService = require('../services/task');
const credentialService = require('../services/credential');
const noteService = require('../services/note');
const jwt = require("jsonwebtoken");
const { request, response } = require('express');

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
routes.post('/addTask/:userid', isAuthenticated, (request, response)=>{
    return taskService.addTask(request, response);
    
});

//get all pending tasks
routes.get('/getPendingTasks/:userid', isAuthenticated,(request, response)=>{
   
    return taskService.getUserTasks(request, response);

});
//get all completed tasks
routes.get('/getCompletedTasks/:userid', isAuthenticated, (request, response)=>{
   
    return taskService.getCompletedTasks(request, response);

});

//delete task
routes.delete('/deleteTask/:userid/:task_id', isAuthenticated, (request, response, next)=>{
    return taskService.deleteTask(request, response);

});

//update Task
routes.put('/updateTask/:userid/:task_id', isAuthenticated, (request, response)=>{
    return taskService.updateTask(request, response); 
});

//mark task completed
routes.put('/taskCompleted/:userid/:task_id', isAuthenticated, (request, response)=>{
    return taskService.taskCompleted(request, response); 
});

//add credential
routes.post('/addCredential/:userid', isAuthenticated, (request, response, next)=>{
    
    return credentialService.addCredential(request, response);

});

//get all credentials
routes.get('/getAllCredentials/:userid', isAuthenticated, (request, response)=>{
   
    return credentialService.getAllCredentials(request, response);

});

//delete credential
routes.delete('/deleteCredential/:userid/:credentialid', isAuthenticated, (request, response)=>{
    return credentialService.deleteCredential(request, response);

});

//update crdential
routes.put('/updateCrdential/:userid/:credential_id', isAuthenticated, (request, response)=>{
        return credentialService.updateCredential(request, response);
});

//get all note
routes.get('/getnotes/:userid', isAuthenticated, (request, response)=>{
    return noteService.getallnotes(request, response);
});

//add note
routes.post('/addnote/:userid', isAuthenticated,(request, response)=>{
    console.log('jerr');
    return noteService.addnote(request, response);
});

//update note
routes.put('/updatenote/:userid/:noteid', isAuthenticated,(request, response)=>{
    return noteService.updatenote(request, response);
});

//delete note
routes.delete('/deletenote/:userid/:noteid', isAuthenticated,(request, response)=>{
    return noteService.deletenote(request, response);
});



//logout
// routes.get('/logout', (request, response)=>{
//     //jwt.destroy(token);

//     request.logout();
// });




module.exports = routes;