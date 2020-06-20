const mongoose = require('mongoose');
const schema = mongoose.Schema;
const credential = new schema({
    name : {
        type :String,
        required : true
    },
    key : {
        type : String,
        required : true
    },
    createdOn :{
        type :Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Credentials', credential);
