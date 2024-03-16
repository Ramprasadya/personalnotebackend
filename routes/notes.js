const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

const router =  express.Router();

// Fetch notes 
router.get("/getnotes",fetchuser,async(req,res)=>{
    try {
        
        let notes = await Notes.find({user :req.user.id})
        res.send(notes)
    } catch (err) {
        console.log(err);
        res.status(500).json({message:"Internal server Error"})
    }
})
// add notes 
router.post("/addnotes",fetchuser,[
    body("title","Enter a valid email").isLength({min:3}),
    body("desc","Enter at least 4 number ").isLength({ min: 5 }),
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {title,desc,tag} = req.body
    try {
        let notes = await new Notes({title,desc,tag,user:req.user.id})
        let savenote = await notes.save();
        res.send(savenote);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server Error"})
    }

})

// Updatingn the note 

router.put("/updatenotes/:id",fetchuser,[
    body("title","Enter a valid email").isLength({min:3}),
    body("desc","Enter at least 4 number ").isLength({ min: 5 }), 
],async(req,res)=>{
 const  {title,desc,tag} = req.body;
 let newNote = {};
 if(title){newNote.title = title};
 if(desc){newNote.desc = desc};
 if(tag){newNote.tag = tag};

 let note = await Notes.findById(req.params.id)
//  console.log(note)
 if(!note){
    return res.status(404).send("not found ")
 }
 if(note.user.toString() !== req.user.id ){
    return res.status(401).send("Not Allow")
 }

 note = await Notes.findByIdAndUpdate(req.params.id , {$set: newNote},{new: true})

 res.json({note});

})

// Delete notes  /..........

router.post("/deletenote/:id",fetchuser,async(req,res)=>{
 let noteId = req.params.id;
 let note = await Notes.findById(noteId);
 if(!note){
    return res.status(404).send("not found ")
 }
 if(note.user.toString() !== req.user.id ){
    return res.status(401).send("Not Allow")
 }
 note = await Notes.findByIdAndDelete(noteId);
 res.json({success:"Note has been deleted successfully.."})
})



module.exports = router ;