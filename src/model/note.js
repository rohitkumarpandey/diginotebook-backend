const mongoose = require('mongoose');
const schema  = mongoose.Schema;

const note  = schema({

    title : {
        type : String,
        required : true
    },
    note : {
        type : String,
        required : true,
    },
    lastUpdated : {
        type : Date,
        default : Date.now
    },
    createdOn : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Note',note);