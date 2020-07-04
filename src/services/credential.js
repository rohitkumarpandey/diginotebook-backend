const Credential = require('../model/credential');
const UserData = require('../model/userdata');

let service = {};

//adding credential
service.addCredential = async(request, response)=>{
    await UserData.findOne({userid : request.params['userid']})
    .then((user)=>{
        if(!user){ //if user doensn't has any task 
            Credential.create(request.body)
            .then((credentialcreated)=>{
                //if task created successfully
                if(credentialcreated){
                    UserData.create({userid :  request.params['userid'] , credentials : credentialcreated._id})
                    .then((usercreated)=>{
                        //if user created successfully and task added to it
                        if(usercreated) return response.json('Credential Added');
                    });
                    
                }
            });
        }else{ //if user already has Credential 
            
            Credential.create(request.body)
            .then((credentialcreated)=>{
                //if Credential created successfully
                if(credentialcreated){
                    UserData.updateOne({userid : user.userid}, {$addToSet : {credentials : credentialcreated._id}})
                    .then((updated)=>{
                        //if Credential added to user successfully
                        if(updated){
                            return response.status(200).json('Credential Added');

                        }else{
                            return responsestatus(500).json('Failed to add Credential');
                        }
                    });
                    
                    
                }else{
                     //if Credential failed to create
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

//delete Credential
service.deleteCredential = async (request, response)=>{
    await Credential.findByIdAndDelete({_id: request.params['credentialid']})
    .then((crdentialdeleted)=>{
        if(crdentialdeleted){
            UserData.updateOne({userid : request.params['userid']}, {$pull : {credentials : request.params['credentialid']}})
                .then((updated)=>{
                    if(updated){
                        return response.status(200).json('Credential Deleted Succussfully');
                    }else{
                        return response.status(200).json('Failed to delete credential from user');
                    }
                });
    }else{
        return response.status(200).json('Failed to delete credential');

    }   
    });
}

//update credential
service.updateCredential= async (request, response)=>{
    await Credential.updateOne({_id : request.params['credential_id']}, request.body)
    .then((credentialupdated)=>{
        //if Credential updated
        if(credentialupdated) return response.status(200).json('Credential Updated!');
        else return response.json('Failed to update credential');
    });
}



module.exports = service;