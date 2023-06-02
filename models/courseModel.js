let mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    fee:{
        type:Number,
        required:true
    },
    shortname:{
        type:String,
        required:false
    }
})
const courseModel =mongoose.model("course",courseSchema) 
module.exports = courseModel