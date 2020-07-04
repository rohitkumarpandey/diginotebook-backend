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
    ],
    notes : [
        {type : schema.Types.ObjectId, ref : 'Note'}
    ]
});

module.exports = mongoose.model('UserData', userdata);