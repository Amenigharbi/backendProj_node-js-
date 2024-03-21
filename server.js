const express= require("express");
const dotenv=require('dotenv');
const morgan=require('morgan');

dotenv.config({path:"config.env"});
const dbconn=require("./config/database");
const categoryRoute=require('./routes/categRoute');
dbconn();
const app=express();

app.use(express.json());//parsing lil json , convertir en javascript object 
if(process.env.NODE_ENV==='development')
{
    app.use(morgan('dev'));
    console.log(`mode: ${process.env.NODE_ENV}`)
}

//mount routes
app.use("/api/v1/categories",categoryRoute);
const port=process.env.port||8000;

app.listen(port,()=>{
    console.log(`app run on port ${port}`);
});