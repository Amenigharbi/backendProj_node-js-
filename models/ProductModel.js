const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
   title:{
    type:String,
    required:true,
    trim:true,
    minLength:[3,'too short product title'],
    maxLength:[100,'too long product title'],
   },
   slug:{
    type:String,
    required:true,
    lowercase:true,
   },
   description:{
    type:String,
    required:[true,'product description is required'],
    minLength:[20,'too short product description'],
   },
   quantity:{
    type:Number,
    required:[true,'product quantity is required'],
   },
   sold:{
    type:Number,
    default:0,   
   },
   price:{
    type:Number,
    required:[true,'product price is required'],
    trim:true,
    max:[200000,'too short product price'],
   },
   priceAfterDiscount:{
    type:Number,
   },
   colors:[String],
   images:[String],
   imageCover:{
    type:String,
    required:[true,"product image cover is required"],
   },
   category:{
     type:mongoose.Schema.ObjectId,
     ref:"Category",
     required:[true,"product must belong to category"],
   },
   subCategories:[{
    type:mongoose.Schema.ObjectId,
    ref:"SubCategory",
   }],
   brand:{
    type:mongoose.Schema.ObjectId,
    ref:"Brand",
   },
   ratingsAverge:{
    type:Number,
    min:[1,"rating must be above or equal 1"],
    max:[5,"rating must be below or equal 5"],
   },
   ratingsQuantity:{
    type:Number,
    default:0,
   }

},{timestamps:true,});

//Mongoose query middleware 
productSchema.pre(/^find/,function(next){
  this.populate({
    path:"category",
    select:"name -_id",
  });
  next();
});

module.exports=mongoose.model('Product',productSchema);
