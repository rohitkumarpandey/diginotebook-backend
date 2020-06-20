const Credential = require('../model/credential');
const UserData = require('../model/userdata');

let service = {};

//adding credential
service.addCredential = async(request, response)=>{
    await UserData.findOne({userid : request.params['user_id']})
    .then((user)=>{
        if(!user){ //if user doensn't has any task 
            Credential.create(request.body)
            .then((credentialcreated)=>{
                //if task created successfully
                if(credentialcreated){
                    UserData.create({userid :  request.params['user_id'] , credentials : credentialcreated._id})
                    .then((usercreated)=>{
                        //if user created successfully and task added to it
                        if(usercreated) return response.json('Credential Added');
                    });
                    
                }
            });
        }else{ //if user already has tasks 
            
            Credential.create(request.body)
            .then((credentialcreated)=>{
                //if task created successfully
                if(credentialcreated){
                    UserData.updateOne({userid : user.userid}, {$addToSet : {credentials : credentialcreated._id}})
                    .then((updated)=>{
                        //if task added to user successfully
                        if(updated){
                            return response.status(200).json('Credential Added');

                        }else{
                            return responsestatus(500).json('Failed to add Credential');
                        }
                    });
                    
                    
                }else{
                     //if task failed to create
                     return responsestatus(500).json('Failed to add Credential');


                }
            });
        }
    }).catch(()=>{
                return response.status(400).json('Error occured in adding Credential!')});

}

//get All Credentials
service.getAllCredentials =  async (request, response)=>{
    await UserData.findOne({userid: request.params['userid']})
    .populate('credentials')
    .then((user)=>{
        if(user){
            return response.status(200).send(user.credentials);
        }else{
            return response.status(200).json('You do not added any credential');
        }
    });
}



module.exports = service;