const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const router =  express.Router();

router.post("/addnote",async(req,res)=>{

})

router.get("/getnotes",fetchuser,async(req,res)=>{
  let notes = await Notes.find({user :req.user.id})
  res.send(notes)
})


module.exports = router ;