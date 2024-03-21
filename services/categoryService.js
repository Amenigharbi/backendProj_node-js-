
const categoryModel=require("../models/categoryModel")

exports.getCategories=(req,res)=>{
  const name=req.body.name;
  console.log(req.body);
  const newCatg=new categoryModel({name});
  newCatg.save().then((doc)=>{
    res.json(doc);
  }).catch((err)=>{
    res.json(err);
  });
};