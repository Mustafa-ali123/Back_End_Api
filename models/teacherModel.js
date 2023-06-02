// name course contact 
const mongoose = require('mongoose')
const teacherschema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    }, 
      course:{
        type:Number,
        required:true
    },    
    contact:{
        type:String,
        required:true
    },
})
const teacherModel = new mongoose.model("teacher",teacherschema)
module.exports=teacherModel