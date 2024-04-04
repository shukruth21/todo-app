const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://shukruthj:shukruth21@cluster0.hskdsc7.mongodb.net/").then((data)=>{
    console.log("connected to mongo db");
})
    
const todoSchema= mongoose.Schema({
    title:String,
    description: String,
    completed: Boolean
})
const todo=mongoose.model('todos',todoSchema);
 module.exports={
    todo
}