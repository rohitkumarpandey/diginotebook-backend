const UserData = require('../model/userdata');
const Task = require('../model/task');

let service = {};

//adding task
service.addTask = async(request, response)=>{

    await UserData.findOne({userid : request.params['userid']})
    .then((user)=>{
        if(!user){ //if user doensn't has any task 
            Task.create(request.body)
            .then((taskcreated)=>{
                //if task created successfully
                if(taskcreated){
                    UserData.create({userid :  request.params['userid'] , tasks : taskcreated._id})
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
                    UserData.updateOne({userid : user.userid}, {$addToSet : {tasks : taskcreated._id}})
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

//get all user pending tasks
service.getUserTasks = async (request, response)=>{
    await UserData.findOne({userid: request.params['userid']})
    .populate({ path : 'tasks', match : { 'taskStatus.completed' : false}})
    .exec(function(err, user){
        if(err) throw new Error(err);
        if(user.tasks.length == 0) return response.status(200).send([]);
        return response.status(200).send(user.tasks);
    });
}

//get all user completed tasks
service.getCompletedTasks = async (request, response)=>{
    await UserData.findOne({userid: request.params['userid']})
    .populate({ path : 'tasks', match : {'taskStatus.completed': true}})
    .exec(function(err, user){
        if(err) throw new Error(err);
        if(user.tasks.length == 0) return response.status(200).send([]);
        return response.status(200).send(user.tasks);
    })
    .catch((err)=> response.status(200).json('Not found anything'));
}

//delete Task 
service.deleteTask = async (request, response)=>{
    
    await Task.findByIdAndDelete({_id: request.params['task_id']})
    .then((taskdeleted)=>{
        if(taskdeleted){
            UserData.updateOne({userid : request.params['userid']}, {$pull : {tasks : request.params['task_id']}})
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
        //if task updated
        if(taskupdated) return response.status(200).json('Task Updated!');
        else return response.json('Failed to update task');
    });
}

//mark Task completed
service.taskCompleted = async (request, response)=>{
    await Task.updateOne({_id : request.params['task_id']}, {taskStatus : {completed: request.body.taskCompleted , completionDate : Date.now()}})
    .then((taskCompleted)=>{
        if(taskCompleted){
            return response.json('Task marked as completed');
        }else{
            return new Error('Failed to mark task completed');
        }
    });
}

module.exports = service;