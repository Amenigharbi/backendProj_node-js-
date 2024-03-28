const express= require("express");
const dotenv=require('dotenv');
const morgan=require('morgan');

dotenv.config({path:"config.env"});
const ApiError=require("./utils/apiError");
const dbconn=require("./config/database");
const categoryRoute=require('./routes/categRoute');
const SubCategoryRoute=require('./routes/subCategRoute');
const BrandRoute=require('./routes/BrandRoute');

const globalError=require('./middlewares/errorMiddleware');
dbconn();
const app=express();

app.use(express.json());//parsing lil json , convertir en javascript object 
if(process.env.NODE_ENV==='development')
{
    app.use(morgan('dev'));
    console.log(`mode: ${process.env.NODE_ENV}`)
}

app.use('/categories', categoryRoute);
app.use('/Subcategories', SubCategoryRoute);
app.use('/Brands', BrandRoute);
app.all("*",(req,res,next)=>{
 next(new ApiError(`can't find this route:${req.originalUrl}`,400))
})

//global error handling middleware for express 
app.use(globalError);
const port=process.env.port||8000;

const server=app.listen(port,()=>{
    console.log(`app running on port ${port}`);
});

//event=>list=>callback(err)
//handle rejection outside express 
process.on("unhandledRejection",(err)=>{
   console.error(`unhandledRejection errors:${err.name}|${err.message}`);
   server.close(()=>{
    console.error(`shutting down...`);
    process.exit(1);//shutdown app
   })
  
});