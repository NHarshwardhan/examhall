const router = require("express").Router();
const verify = require("../verifyToken");
const mongoose = require("mongoose");

// Create Schema
const questionSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    examkey: String,
    examname: String

});

const ApprovedStudent = mongoose.model("approvedstudent", questionSchema);

router.post("/", (req, res) => {

    const newStudent = new ApprovedStudent({      
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        examkey: req.body.examkey,
        examname: req.body.examname
    })

    newStudent.save((err,results)=>{
          if(err) throw err
          res.json({'status':'student approved successfully'})
     })
  
});

router.put("/:id", (req, res) => {
   ApprovedStudent.findById({_id:req.params.id},(err,document)=>{
        if(err) throw err;
         document.name= req.body.name,
         document.email= req.body.email,
         document.password= req.body.password,
         document.role= req.body.role,
         document. examkey= req.body.examkey,
         document. examname= req.body.examname

        document.save((err,updatedRecord)=>{
           if(err) throw err;
           res.json({'status':'student updated successfully'});
        })
    })
   
  
});

router.get("/", (req, res) => {
    ApprovedStudent.find().exec((err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
router.get("/:id", (req, res) => {
      ApprovedStudent.findById({_id:req.params.id},(err,result)=>{
         if(err) throw err;
         res.json(result);
    })
});


module.exports = router;
