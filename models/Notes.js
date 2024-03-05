const mongoose = require("mongoose")
const { Schema } = mongoose;

const NotesSchema = new Schema({
  title:{
    type: String,
    require:true
  },
  desc:{
    type: String,
    require:true,
    
  },
  tag:{
    type: String,
    default:"Genaral"
  },
  Date:{
    type: Date,
    default : Date.now
  },
});


const Notes = mongoose.model("Notes",NotesSchema);

module.exports  = Notes;