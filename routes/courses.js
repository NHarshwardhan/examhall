const router = require("express").Router();
const verify = require("../verifyToken");
const mongoose = require("mongoose");

// Create Schema
const questionSchema = new mongoose.Schema({

  coursekey: String,
  coursename: String,
  duration: Number,

});

const Courses = mongoose.model("courses", questionSchema);

router.post("/", (req, res) => {

    const newCourse = new Courses({      
        coursekey: req.body.coursekey,
        coursename: req.body.coursename,
        duration: req.body.duration,
    })

     newCourse.save((err,results)=>{
          if(err) throw err
          res.json({'status':'course added successfully'})
     })
  
});

router.get("/", (req, res) => {
   Courses.find().exec((err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

module.exports = router;
