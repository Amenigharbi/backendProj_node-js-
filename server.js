const express= require("express");
const dotenv=require('dotenv');
const morgan=require('morgan');
const mongoose=require('mongoose');
dotenv.config({path:"config.env"});
mongoose.connect('mongodb://127.0.0.1:27017/nodeComm');
const app=express();
app.use(morgan('dev'));
if(process.env.NODE_ENV==='development')
{
    app.use(morgan('dev'));
    console.log(`mode: ${process.env.NODE_ENV}`)
}
app.get("/",(req,res)=>{
    res.send('our api v1');
})

const port=process.env.port||8000;

app.listen(port,()=>{
    console.log(`app run on port ${port}`);
});