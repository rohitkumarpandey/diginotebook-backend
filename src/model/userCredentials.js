const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userCredential = new schema({
    userid :{
        type : String,
        required : true
    },
    
});

module.exports = mongoose.model('UserCredentials', userCredential);