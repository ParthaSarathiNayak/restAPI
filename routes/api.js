const express = require('express');
const Student = require('../models/db');
const router = express.Router();




//get a list from database
router.get('/biku', function(req, res){
    //res.send({type:'GET'});
    if (!req.body){
        return res.status(400).send({message: "Student Cannot be empty!"});
    }

    Student.find({}).then(function(data){
        res.send(data);
    }).catch((error) => {
        console.error(error.message);
        res.send({err: error.message});
    });
});





//add a new member to database

router.post('/biku', function(req, res){
    //console.log(req.body);
    //var student = new Student(req.body);
    //student.save();
    if (!req.body){
        return res.status(400).send({message: "Student Cannot be empty!"});
    }
    
    Student.create(req.body).then(function(stud){
       // res.send(stud);
       res.status(201).json(stud);
    }).catch((error) => {
        console.error(error.message);
        res.send({err: error.message});
    });

    //res.send({
      //  type:'POST',
       // name:req.body.name,
        //id:req.body.id
    //});
});





//update a data
router.put('/biku/:id', function(req, res){
    if (!req.body){
        return res.status(400).send({message: "Student Cannot be empty!"});
    }
    
    
    Student.findByIdAndUpdate({_id: req.params.id},req.body).then(function(){
        Student.findOne({_id:req.params.id}).then(function(data){
            res.send(data);
        });
    }).catch((error) => {
        console.error(error.message);
        res.send({err: error.message});
    });
    //res.send({type:'PUT'});
});





//delete a data from database
router.delete('/biku/:id', function(req, res){
    if (!req.body){
        return res.status(400).send({message: "Student Cannot be empty!"});
    }
    
    Student.findByIdAndRemove({_id: req.params.id}).then(function(data){
        res.send(data);
    }).catch((error) => {
        console.error(error.message);
        res.send({err: error.message});
    }); 
    
});

module.exports = router;