const express= require("express");
const app=express();
app.get("/",(req,res)=>{
    res.send('our api');
})

app.listen(8001,()=>{
    console.log("app run");
});