// name address shortName tel 
const mongoose = require('mongoose')
const instituteschema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    }, 
      address:{
        type:String,
        required:true
    },    
    tel:{
        type:Number,
        required:true
    }, 
    shortName:{
        type:String,
        required:true
    },
})
const instituteModel = new mongoose.model("institute",instituteschema)
module.exports=instituteModel