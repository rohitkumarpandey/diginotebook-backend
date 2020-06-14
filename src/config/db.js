const mongoose = require('mongoose');
require('../model/user');
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

const {database_connection_url} = require('./configuration');

mongoose.connect(database_connection_url).then(()=>{
    console.log('Database connection established!');
}, error=>{console.log('Failed to connect to the database due to error : '+error)});