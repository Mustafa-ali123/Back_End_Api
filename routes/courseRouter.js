const express = require("express")
const { sendResponse } = require('../helper/helper');
const courseModel = require('../models/courseModel')

const route = express.Router();

route.get("/", async (req, res) => {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3
    let skips = (page - 1) * limit
    try {
        const result = await courseModel.find().skip(skips).limit(limit)
        if (!result) {
            res.send(sendResponse(false, null, 'Data Not Found')).status(400)
        } else {
            res.send(sendResponse(true, result)).status(200)
        }
    } catch (e) {
        console.log(e)
        res.send(sendResponse(false, null, 'Internal error')).status(400)

    }
});
route.get("/search", async (req, res) => {
    let {name}=req.body
    try {
        if(name){
         const result = await courseModel.find({
            name:name
        }) 
         if (!result) {
            res.send(sendResponse(false, null, 'Data Not Found')).status(400)
        } else {
            res.send(sendResponse(true, result)).status(200)
        }
             
        }
       
    } catch (e) {
        console.log(e)
        res.send(sendResponse(false, null, 'Internal error')).status(400)

    }
});
route.post("/", async (req, res) => {
    let errArr = [];
    try {
        let { name, duration, fee, shortname } = req.body
        if (!name) {
            errArr.push('Required : Name')
        }
        if (!duration) {
            errArr.push('Required : duration ')
        }
        if (!fee) {
            errArr.push('Required : fee')
        }
        if (!shortname) {
            errArr.push('Required : shortName ')
        }
        if (errArr.length > 0) {
            res.send(sendResponse(false, null, 'Required All Fields')).status(400)
        } else {
            let obj = { name, duration, fee, shortname }
            let course = new courseModel(obj)
            await course.save()
            if (!course) {
                res.send(sendResponse(false, null, 'internal error')).status(400)
                return;
            } else {
                res.send(sendResponse(true, course, 'successfully send data')).status(200)
            }
        }

    } catch (e) {
        console.log(e)
    }
});
route.get("/:id", async (req, res) => {
    let id = req.params.id
    try {
        const result = await courseModel.findById(id)
        if (!result) {
            res.send(sendResponse(true, null, 'Data Not Found')).status(404)
        } else {
            res.send(sendResponse(true, result)).status(200)
        }
    } catch (e) {
        console.log(e)
        res.send(sendResponse(true, null, 'Internal error')).status(400)
    }
});
route.put("/:id", async (req, res) => {
    let id = req.params.id
    let result = await courseModel.findById(id)

    try {
        if(!result){
            res.send(sendResponse(false, null, 'Data Not Found')).status(404)            
        } else {
            let update = await courseModel.findByIdAndUpdate(id,req.body,{
                new:true,
            }) 
            if(!update){
            res.send(sendResponse(false, null, 'Data Not Found')).status(404)                            
            }else{
                res.send(sendResponse(true, update, 'Data Update')).status(200)            
            }
        }
    } catch (e) {
        res.send(sendResponse(false, null, 'Internal Error')).status(400)
    }



});
route.delete("/:id", async (req, res) => {
 let id = req.params.id;
 let result =await courseModel.findById(id)

 if(!result){
    res.send(sendResponse(false, null, 'Data Not Found')).status(404)                                
 }else{
    let deleResult = await courseModel.findByIdAndDelete(id)
    if(!deleResult){
    res.send(sendResponse(false, null, 'Data Not Deleted')).status(400)
 }else{
    res.send(sendResponse(true, deleResult, 'Data Deleted')).status(200)                                            
    }
 }
});

module.exports = route;