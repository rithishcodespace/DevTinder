const express = require("express");

const app = express();
 
app.listen(3000,()=>console.log("port successfully activated!!"));

app.use("/test",(req,res)=>{
    res.send("you got it!");
})