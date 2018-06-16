const express = require('express');
const Student = require('../models/db');
const router = express.Router();

//get a list from database
router.get('/biku', function(req, res){
    res.send({type:'GET'});
});

//add a new member to database
router.post('/biku', function(req, res){
    //console.log(req.body);
    //var student = new Student(req.body);
    //student.save();

    Student.create(req.body).then(function(stud){
        res.send(stud);
    });

    res.send({
        type:'POST',
        name:req.body.name,
        id:req.body.id
    });

});

//update a data
router.put('/biku/:id', function(req, res){
    res.send({type:'PUT'});
});

//delete a data from database
router.delete('/biku/:id', function(req, res){
    res.send({type:'DELETE'});
});

module.exports = router;