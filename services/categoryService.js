const slugify=require('slugify')
const categoryModel=require("../models/categoryModel");

exports.getCategories=(req,res)=>{
  //const name=req.body.name;
  //console.log(req.body);
  res.send();
};

exports.createCateg=(req,res)=>{
const name=req.body.name;
categoryModel.create({name,slug:slugify(name)})
 .then((category) =>res.status(201).json({data:category})
).catch((err)=>res.status(400).send(err));
};