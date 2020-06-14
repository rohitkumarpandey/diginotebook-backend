const User = require('../model/user');
const bcrypt = require('bcryptjs');

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
                    if(user) return response.status(200).json({success : true , userid :user._id, username : user.username});

                    let err = new Error('Registration Failed!');
                    err.status = 500;
                    return response.send(err);
                });
            });
        }
    })
    .catch((exception)=>{
        return response.json(exception);
    });
}

module.exports = service;
