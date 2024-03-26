const mongoose=require('mongoose');
const SubcategorySchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        unique:[true,'subcategory unique'],
        minlength:[2,'too short subcategory name'],
        maxlength:[32,'too long subcategory name'],
    },
        slug:{
        type:String,
        lowercase:true,
    }, 
    category:{
        type:mongoose.Schema.ObjectId,
        ref:"Category",
        required:[true,"Subcategory must belong to parent category"],
    },
},{timestamps:true})

//create model
const SubcategoryModel=mongoose.model('SubCategory',SubcategorySchema);
module.exports=SubcategoryModel;