const express= require("express");
const dotenv=require('dotenv');
dotenv.config({path:"config.env"});
const app=express();
app.get("/",(req,res)=>{
    res.send('our api v1');
})

const port=process.env.port||8000;

app.listen(port,()=>{
    console.log(`app run on port ${port}`);
});