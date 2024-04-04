const express= require("express");
const { createTodo, updateTodo}  = require("./types");
const { todo }=require("./db");
const cors=require("cors");
const app = express();

app.use(express.json());

//body{
//title:string,
//description:string
//}
app.post("/todo", async function(req,res){
    const createPayload=req.body;
    const parsedPayload=createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"incorrect credentials",
        })
        return;
    }
    // put it in mongo
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })
    res.json({
        msg:"todo created"
    })
})

app.get("/todos",async function(req,res){
    const todos= await todo.find({});
    res.json({
        todos
    })

})


app.put("/completed",async function(req,res){
    const updatePayload=req.body;
    const parsedPayload=updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"incorrect credentials",
        })
        return;
    }
    await todo.update({
        _id: req.body._id
    },
    {
        completed:true
    })

    res.json({
        msg:"todo marked completed"
    })
})
 
app.listen(3000,()=>{
    console.log(`port is running on 3000`)
})