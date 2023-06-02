const express = require("express");
const instituteModel = require("../models/instituteModel");
const { sendResponse } = require("../helper/helper");

const route = express.Router();

route.get("/", async (req, res) => {
    // let page = Number(req.query.page) || 1;
    // let limit = Number(req.query.limit) || 3
    // let skips = (page - 1) * limit
    try {
        const result = await instituteModel.find()//.skip(skips).limit(limit)
        if (!result) {
            res.send( sendResponse (false, null, 'Data Not Found')).status(400)
        } else {
            res.send(sendResponse(true, result)).status(200)
        }
    } catch (e) {
        console.log(e)
        res.send(sendResponse(false, null, 'Internal error')).status(400)

    }
});
route.get("/search", async (req, res) => {
    let {name,tel}=req.body
    try {
        if(name){
           const result = await instituteModel.find({
            name:name,
            tel:tel
        })
        if(!result){
            res.send( sendResponse (false, null, 'Data Not Found')).status(400)
        } else {
            res.send(sendResponse(true, result)).status(200)
        }
        }      
    
    }catch (e) {
        console.log(e)
        res.send(sendResponse(false, null, 'Internal error')).status(400)

    }
});
route.post("/", async (req, res) => {
    let errArr =[]
    try{
        let {name ,address ,shortName,tel}= req.body
        if(!name){
            errArr.push("'Required : name '")
        }
        if(!address){
            errArr.push("'Required : address '")
        }
        if(!tel){
            errArr.push("'Required : tel '")
        }
        if(!shortName){
            errArr.push("'Required : shortName '")
        }
        if(errArr.length>0){
            res.send(sendResponse(false,null,'Required All Fields')).status(400)
            return
        }else{
            let obj= {name ,address ,shortName,tel}
            let institute =new instituteModel(obj)
            await institute.save()
            if(!institute){
                res.send(sendResponse(true, null ,'internal error')).status(400)
              }else{
                res.send(sendResponse(true, institute ,'successfully send data')).status(200)
              }
        }
    
    }catch(e){
        console.log(e)
    }
});
route.get("/:id",async (req, res) => {
    let id = req.params.id;
    let result = await instituteModel.findById(id)
    if(!result){
        res.send(sendResponse(false,null ,"data not found")).status(404)        
    }else{
        res.send(sendResponse(true,result)).status(200)        
    }
});
route.put("/:id",async (req, res) => {
    let id = req.params.id;
    let result =await instituteModel.findById(id) 
    try{
        if(!result){
        res.send(sendResponse(false,null ,"data not found")).status(404)      
        }else{
        let update = await instituteModel.findByIdAndUpdate(id,req.body,{new:true})     
        if(!update){
        res.send(sendResponse(false,null ,"Internal Error")).status(400)                  
        }else{
            res.send(sendResponse(true,update )).status(200)      
        }
        }
    }catch(e){
        console.log(e)
    }
});
route.delete("/:id",async (req, res) => {

    let id = req.params.id;
    let result =await instituteModel.findById(id) 
    try{
        if(!result){
        res.send(sendResponse(false,null ,"data not found")).status(404)      
        }else{
        let del = await instituteModel.findByIdAndDelete(id)     
        if(!del){
        res.send(sendResponse(false,null ,"Internal Error")).status(400)                  
        }else{
            res.send(sendResponse(true,del,"Data Deleted")).status(200)      
        }
        }
    }catch(e){
        console.log(e)
    }


});

module.exports = route;