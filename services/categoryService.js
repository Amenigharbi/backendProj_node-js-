const slugify=require('slugify');
const asyncHandler=require('express-async-handler');
const categoryModel=require("../models/categoryModel");

//@desc get list of categories 
//@route GET /
//@access public
exports.getCategories=asyncHandler(async(req,res)=>{
  const categories=await categoryModel.find({});
  res.status(200).json({results:categories.length,data:categories});
  
});


//@desc create category
//@route POST /
//@access private 
exports.createCateg= asyncHandler(async(req,res)=>{
const name=req.body.name;
//async await 
const category=await categoryModel.create({name,slug:slugify(name)})
res.status(201).json({data:category});
});