const mongoose=require('mongoose');
//create schema 
const BrandSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'category required'],
        unique:[true,'category unique'],
        minlength:[3,'too short category name'],
        maxlength:[32,'too long category name'],
    },
    slug:{
        type:String,
        lowercase:true,
    }, 
    image:String ,
},{timestamps:true})

//create model
const BrandModel=mongoose.model('Brand',BrandSchema);
module.exports=BrandModel;