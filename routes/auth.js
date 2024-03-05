const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "iamlearningbackend"

// Create a user
router.post(
  "/createuser",
  [
    body("name","Enter a valid name").isLength({ min: 3 }),
    body("email","Enter a valid email").isEmail(),
    body("password","Enter at least 4 number ").isLength({ min: 4 }),
  ],
  async(req, res) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try{
     let user =  await User.findOne({email:req.body.email});
    // console.log(user)
  if(user){
    return  res.status(400).json({message:"This email is already exist"})
  }
//    password hashing  ........
    const salt = await bcrypt.genSalt(10)
    const secpass = await bcrypt.hash(req.body.email ,salt)
      user = await User.create({
       name: req.body.name,
       email : req.body.email,
       password: secpass
     })

     const data = {
        user :{
         id: user.id
        }
     }
     const authToken = jwt.sign(data,JWT_SECRET)
     console.log(authToken)
     res.json(user);
  
  }catch(err){
   console.log(err);
   res.status(500).json({message:"Internal server Error"})
  }
//   .then(user => res.json(user)).catch((err)=>{
//     res.json({message:"Enter a unique email",err:err.message})
//   })
   
  }
);

module.exports = router;
