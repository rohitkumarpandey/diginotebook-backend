const express = require('express');
const app = express();
const cors = require('CORS');
const routes = require('./routes/routing');
const body_parser = require('body-parser');
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());
require('./config/db');
app.use(cors());
app.use('/',routes);
app.listen(port, ()=>{console.log('Server listening at : '+port)});



