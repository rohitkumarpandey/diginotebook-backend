const mongoose = require('mongoose');
const schema = mongoose.Schema;


const usertask = new schema({
    userid : {
        type : String,
        required : true 
    },
    tasks:[
        {type: schema.Types.ObjectId, ref : 'Task'}
    ]
});

module.exports = mongoose.model('UserTask', usertask);