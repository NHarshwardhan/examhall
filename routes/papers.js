const router = require("express").Router();
const verify = require("../verifyToken");
const mongoose = require("mongoose");

// Create Schema
const questionSchema = new mongoose.Schema({
  Qid: Number,
  Question: String,
  Option1: String,
  Option2: String,
  Option3: String,
  Option4: String,
  Answer: String,
});

router.post("/:coursename", (req, res) => {
  let course = req.params.coursename;
  let items = req.body.map((item) => {
    return {
      Qid: item.Qid,
      Question: item.Question,
      Option1: item.Option1,
      Option2: item.Option2,
      Option3: item.Option3,
      Option4: item.Option4,
      Answer: item.Answer,
    };
  });

  const Paper = mongoose.model("Papers_" + course, questionSchema);

  Paper.insertMany(items)
    .then((docs) => {
      res.status(200).json({'status':'Question Uploaded'});
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:coursename", (req, res) => {
  let course = req.params.coursename;

  const Paper = mongoose.model("Papers_" + course, questionSchema);

  Paper.find().exec((err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

module.exports = router;
