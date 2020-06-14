const mongoose = require('mongoose');
const schema = mongoose.Schema;

const user = new schema({
    userid:{
        type : String,
        required : true
    },
    password : {
        type : String,
        required :true
    },
    username : {
        type : String,
        required : true
    },
    createdOn :{
        type : Date,
        default : Date.now
    }

});

module.exports = mongoose.model('User', user);