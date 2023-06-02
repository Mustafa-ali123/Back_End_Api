const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter")
const courseRouter = require("./routes/courseRouter");
const StudentRouter = require("./routes/studentRouter");
// const paginationRouter = require("./routes/paginationRoute");
const teacherRouter = require("./routes/teacherRouter");
const instituteRouter = require("./routes/instituteRouter");
require("dotenv").config();


const app = express();
app.use(express.json())//Middleware
app.use(cors())


app.use("/api/user", userRouter );
app.use("/api/course", courseRouter);
app.use("/api/student",StudentRouter);
app.use("/api/teacher", teacherRouter);
// app.use("/api/pagination", paginationRouter);
app.use("/api/institute", instituteRouter );



mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Database Connected Successfully");
    });
  }).catch((err) => {
    console.log(err);
  });
