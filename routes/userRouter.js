const express = require("express");
const bcrypt = require("bcrypt")
const userModel = require("../models/userModel");
const { sendResponse } = require("../helper/helper");
const route = express.Router();

route.post("/signup", async (req, res) => {
    let { userName, email, password } = req.body
    let obj = { userName, email, password }
    let requiredField = ["userName", "email", "password"]
    let errArr = []

    requiredField.forEach((x) => {
        if (!obj[x]) {
            errArr.push(x)
        }
    });

    if (errArr.length > 0) {
        res.send(sendResponse(false, null, 'Please fill All fields', errArr))
            .status(400)
    } else {

        let hashPassword =await bcrypt.hash(obj.password,10)
        obj.password = hashPassword 

        let checkemail = await userModel.findOne({ email })
        if (checkemail) {
            res.send(sendResponse(false, null, "This email already exist")).status(403)
        } else {                       
            userModel.create(obj).then((result) => {
            res.send(sendResponse(true, result, "Successfully Sigup")).status(200);
            }) .catch((e) => {
            res.send(sendResponse(false,null, "Internal server Error",e));
            })
        }
    }

})
route.post("/login", (req, res) => {
    let {email,password}=req.body
    let obj = {email,password}
    
    let checking = userModel.findOne({email}).then(async(result)=>{
    let comparing = await bcrypt.compare(obj.password,result.password)
    if(comparing){
        res.send(sendResponse(true,result,"Login Successlly")).status(200)
    }else{
        res.send(sendResponse(false,null,"Internal Error")).status(400)
    }
    }).catch((e)=>{
     res.send(sendResponse(false,null,"",e)).status(400)
    })


})
route.delete("/:id", (req, res) => {})
route.put("/:id", (req, res) => {})
route.get("/", (req, res) => {})


module.exports = route