const mongoose=require('mongoose');
//create schema 
const category=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'category required'],
        unique:[true,'category unique'],
        minlength:[3,'too short category name'],
        maxlength:[32,'too long category name'],
    },
    //category name a and b =>shoping.com/a-and-b
    slug:{
        type:String,
        lowercase:true,
    }, 
    image:String ,
},{timestamps:true})

//create model
const categoryModel=mongoose.model("category",category);
module.exports=categoryModel;