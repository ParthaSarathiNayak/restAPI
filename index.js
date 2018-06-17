const routes = require('./routes/api');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
let morgan = require('morgan');
let config = require('config');


const app = express();

let options = { 
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
  }; 


//connect to mongodb
mongoose.connect('mongodb://localhost/biks');
//mongoose.Promise = global.Promise;

if(config.util.getEnv('NODE_ENV') !== 'test') {
	//use morgan to log at command line
	app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'})); 


app.use('/api',routes);

app.get('/api', function(req, res){
    console.log('GET request');
    res.send({name: 'Partha'});
});

app.listen(4000,function(){
    console.log('now listening for requests');
});

module.exports = app;