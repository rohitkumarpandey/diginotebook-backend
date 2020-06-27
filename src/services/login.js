let User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

let service = {};

///login user

service.login = async(request, response)=>{
    await User.findOne({userid : request.body.userid})
    .then((user)=>{
        // if user exists
        if(user){
            bcrypt.compare(request.body.password , user.password)
            .then((matchedpassword)=>{
                //if password matched
                if(matchedpassword){ 
                    
                    const payload = {
                        user : {
                            id : user._id
                        }
                    };

                    jwt.sign(payload , "secret", {expiresIn : 36000}, (err, token) => {
                         if(err)  throw err;
                         return response.status(200).json({success :true , userid : user._id , username : user.username, token : token});

                         })
            }//else
                else return response.status(200).json({success : false , errorMessage : 'Passowrd Incorrect'});
            });
    }else{// if user doesn't exists 
        return response.status(200).json({success : false , errorMessage : 'User doesnot exists'})
    }
    })
    .catch(()=>{
        return response.status(404).json('user not found');
    });
}

module.exports = service;
