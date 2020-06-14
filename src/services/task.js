const UserTask = require('../model/usertask');
const Task = require('../model/task');

let service = {};

//adding task
service.addTask = async(request, response)=>{

    await UserTask.findOne({userid : request.params['userid']})
    .then((user)=>{
        if(!user){ //if user doensn't has any task 
            Task.create(request.body)
            .then((taskcreated)=>{
                //if task created successfully
                if(taskcreated){
                    UserTask.create({userid :  request.params['userid'] , tasks : taskcreated._id})
                    .then((usercreated)=>{
                        //if user created successfully and task added to it
                        if(usercreated) return response.json('Task Added');
                    });
                    
                }
            });
        }else{ //if user already has tasks 
            
            Task.create(request.body)
            .then((taskcreated)=>{
                //if task created successfully
                if(taskcreated){
                    UserTask.updateOne({userid : user.userid}, {$addToSet : {tasks : taskcreated._id}})
                    .then((updated)=>{
                        //if task added to user successfully
                        if(updated){
                            return response.status(200).json('Task Added');

                        }else{
                            return responsestatus(500).json('Failed to add task');
                        }
                    });
                    
                    
                }else{
                     //if task failed to create
                     return responsestatus(500).json('Failed to add Task');


                }
            });
        }
    }).catch(()=>{
                return response.status(400).json('Error occured in adding Task!')});
}

//get all user task
service.getUserTasks = async (request, response)=>{
    await UserTask.findOne({userid: request.params['userid']})
    .populate('tasks')
    .then((user)=>{
        if(user){
            return response.status(200).send(user.tasks);
        }else{
            return response.status(200).json('You do not set any task yet');
        }
    });
}

//delete Task 
service.deleteTask = async (request, response)=>{
    
    await Task.findByIdAndDelete({_id: request.params['task_id']})
    .then((taskdeleted)=>{
        if(taskdeleted){
                UserTask.updateOne({userid : request.params['user_id']}, {$pull : {tasks : request.params['task_id']}})
                .then((updated)=>{
                    if(updated){
                        return response.status(200).json('Task Deleted Succussfully');
                    }else{
                        return response.status(200).json('Failed to delete task from user');
                    }
                });
    }else{
        return response.status(200).json('Failed to delete task');

    }
    });
}

//update task
service.updateTask = async (request, response)=>{
    await Task.updateOne({_id : request.params['task_id']}, request.body)
    .then((taskupdated)=>{
        //if task deleted
        if(taskupdated) return response.status(200).json('Task Updated!');
        else return response.json('Failed to update task');
    })
}

module.exports = service;