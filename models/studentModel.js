const mongoose = require('mongoose')
const Studentschema =new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    contact:{
        type:String,
        required:true
    },
    course:{
        type:Number,
        required:true
    },
})
const studentModel = mongoose.model('student',Studentschema)
module.exports = studentModel