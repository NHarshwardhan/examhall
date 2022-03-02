const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const {registerValidation,loginValidation} = require('../validation');


// router.post('/register',(req,res)=>{
//     res.send('Register');
// });


function verifyToken(req,res,next){
  if(!req.headers.authorization){
      return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token==null){
      return res.status(401).send('Unathorized request')
  }
  let payload = jwt.verify(token,process.env.TOKEN_SECRET)
  if(!payload){
      return res.status(401).send('unauthorized access')
  }
  
  next()
}

router.post('/register', async (req,res)=>{
    // Validation Part
    // const error = registerValidation(req.body);
    // if(error) return res.status(400).send(error.details[0].message);


    //Check if the user is already in the database
    const emaiExist = await User.findOne({email:req.body.email});
    if(emaiExist) return res.status(400).send('Email already Exists');


    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);


    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword,
    });

    try{
       const savedUser = await user.save();
    //    res.send(savedUser);
         res.send({user:user._id});
    }
    catch(err){
        res.status(400).send(err);
    }
});

router.get('/list',verifyToken, async (req,res)=>{
     res.send({
         text: 'I am Verified'
     })
  
})

// router.get('/list', async (req,res)=>{
//     res.send({
//         text: 'I am Verified'
//     })
 
// })

// Login ROute
router.post('/login', async (req,res)=>{
    // // Validation Part
    // const error = loginValidation(req.body);
    // if(error) return res.status(400).send(error.details[0].message);


    //Check if the user is already in the database
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Email is not found');


    // Password is correct
    const validPass = await bcrypt.compare(req.body.password ,user.password);
    if(!validPass) return res.status(400).send('Invalid Password');

    // Create and assign token
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send({token:token});

    // res.send('Logged in.!');


   
});





module.exports = router;