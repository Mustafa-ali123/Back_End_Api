const express = require("express");
const { sendResponse } = require("../helper/helper");
const teacherModel = require('../models/teacherModel');
const route = express.Router();

route.get("/", async (req, res) => {
    // let page = Number(req.query.page) || 1;
    // let limit = Number(req.query.limit) || 3;
    // let skips = (page - 1) * limit
    try {
        const result = await teacherModel.find()//.skip(skips).limit(limit)
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
    let { name, course } = req.body;
    try {
        if (name) {
            const result = await teacherModel.find({
                name: name,
                course: course
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
    let errArr = []
    try {
        let { name, course, contact } = req.body
        if (!name) {
            errArr.push("'Required : name '")
        }
        if (!course) {
            errArr.push("'Required : course '")
        }
        if (!contact) {
            errArr.push("'Required : contact '")
        }
        if (errArr.length > 0) {
            res.send(sendResponse(false, null, 'Required All Fields')).status(400)
            return
        } else {
            let obj = { name, course, contact }
            let teacher = new teacherModel(obj)
            await teacher.save()
            if (!teacher) {
                res.send(sendResponse(true, null, 'internal error')).status(400)
            } else {
                res.send(sendResponse(true, teacher, 'successfully send data')).status(200)
            }
        }

    } catch (e) {
        console.log(e)
    }
});
route.get("/:id", async (req, res) => {
    let id = req.params.id
    try {
        const result = await teacherModel.findById(id)
        if (!result) {
            res.send(sendResponse(true, null, 'Data Not Found')).status(400)
        } else {
            res.send(sendResponse(true, result)).status(200)
        }
    } catch (e) {
        console.log(e)
        res.send(sendResponse(true, null, 'Internal error')).status(400)
    }
});
route.put("/:id", async (req, res) => {
    let id = req.params.id;
    let result = teacherModel.findById(id)
    if (!result) {
        res.send(sendResponse(false, null, 'Data Not Found')).status(404)
    } else {
        let updateResult = await teacherModel.findByIdAndUpdate(id, req.body, { new: true })
        if (!updateResult) {
            res.send(sendResponse(false, null, 'Data Not Deleted')).status(400)
        } else {
            res.send(sendResponse(true, updateResult, 'Data Update')).status(200)
        }
    }
});
route.delete("/:id", async (req, res) => {
    let id = req.params.id;
    let result = await teacherModel.findById(id)
    if (!result) {
        res.send(sendResponse(false, null, 'Data Not Found')).status(404)
    } else {
        let delresult = await teacherModel.findByIdAndDelete(id)

        if (!delresult) {
            res.send(sendResponse(false, null, 'Data Not Deleted')).status(400)
        } else {
            res.send(sendResponse(true, delresult, 'Data Deleted')).status(200)
        }
    }
});

module.exports = route;