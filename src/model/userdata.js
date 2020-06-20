const mongoose = require('mongoose');
const schema = mongoose.Schema;


const userdata = new schema({
    userid : {
        type : String,
        required : true 
    },
    tasks:[
        {type: schema.Types.ObjectId, ref : 'Task'}
    ],
    credentials : [
        {type : schema.Types.ObjectId, ref : 'Credentials'}
    ]
});

module.exports = mongoose.model('UserData', userdata);