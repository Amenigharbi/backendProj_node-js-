const express= require("express");
const dotenv=require('dotenv');
const morgan=require('morgan');

dotenv.config({path:"config.env"});
const ApiError=require("./utils/apiError");
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

app.use('/categories', categoryRoute);

app.all("*",(req,res,next)=>{
 next(new ApiError(`can't find this route:${req.originalUrl}`,400))
})

//global error handling middleware 
app.use((err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.status=err.status||"error";
    
    res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack, 
    });
})
const port=process.env.port||8000;

app.listen(port,()=>{
    console.log(`app run on port ${port}`);
});