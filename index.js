const routes = require('./routes/api');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');


const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/biks');
mongoose.Promise = global.Promise;


app.use(bodyParser.json());

app.use('/api',routes);

app.get('/api', function(req, res){
    console.log('GET request');
    res.send({name: 'Partha'});
});

app.listen(4000,function(){
    console.log('now listening for requests');
});