const mongoose=require('mongoose');
//create schema 
const category=new mongoose.Schema({
    name:String,
})

//create model
const categoryModel=mongoose.model("category",category);
module.exports=categoryModel;