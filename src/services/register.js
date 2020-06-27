const User = require('../model/user');
const bcrypt = require('bcryptjs');
const UserData = require('../model/userdata');
const jwt = require('jsonwebtoken');

let service = {}

//Register user
service.register = async (request, response)=>{
    await User.findOne({userid : request.body.userid})
    .then((user)=>{
        //if user exists
        if(user){
            return response.status(200).json({success : false , errorMessage :'User already exits'});
        }else{
            const {userid, username, password} = request.body;
            //encrypting password
            bcrypt.hash(password, 10)
            .then((hashedpassword)=>{
                request.body.password = hashedpassword;
            })
            //storing user in database
            .then(()=>{
                User.create(request.body)
                .then((user)=>{
                    //if registered successfully
                    if(user){ 
                        UserData.create({userid : user._id});
                        
                        const payload = {
                            user : {
                                id : user._id
                            }
                        };
    
                        jwt.sign(payload , "secret", {expiresIn : 36000}, (err, token) => {
                             if(err)  throw err;
                             return response.status(200).json({success :true , userid : user._id , username : user.username, token : token});
    
                             });
                       
                }else{

                    let err = new Error('Registration Failed!');
                    err.status = 500;
                    return response.send(err);
                }
                });
            });
        }
    })
    .catch((exception)=>{
        return response.json(exception);
    });
}

module.exports = service;
