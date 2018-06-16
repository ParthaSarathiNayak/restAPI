const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create biku schema and model
const bikuSchema = new Schema({
    name: {
        type:String,
        required:[true,"Name feild is required"]
    },
    id: {
        type:String
    },
    available: {
        type: Boolean,
        default: false
    }
    //add in student
});

const Student = mongoose.model('student', bikuSchema);

module.exports = Student;