const mongoose = require('mongoose');
const schema = mongoose.Schema;
const task = new schema({
    taskname : {
        type : String,
        required : true
    },
    priority : {
        type : String,
        required : true
    },
    deadline : {
        type : Date,
        required : true
    },
    taskStatus :{
        completed :{
        type : Boolean,
        default :false
    },  completionDate : { type : Date}},   
    createdOn :{
        type:Date,
        default : Date.now
    }

});

module.exports = mongoose.model('Task', task);