const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubcategoryModel = require("../models/subCategoryModel");
const ApiError=require('../utils/apiError');
const ApiFeatures=require('../utils/apiFeatures');
const factory=require('./handlersFactory');
exports.setCategoryIdToBody =(req,res,next)=>{
    //nested route
    if(!req.body.category) req.body.category=req.params.categoryId;
    next();
};

exports.createSubCateg = factory.createOne(SubcategoryModel);

//nested route 
//Get categories/:categoryId/subcategories
exports.createFilterObj=(req,res,next)=>{
    let filterObject={};
    if (req.params.categoryId) filterObject={category:req.params.categoryId};
    req.filterObj=filterObject;
    next();
}

exports.getSubCategories = asyncHandler(async (req, res) => {
  const documentsCounts=await SubcategoryModel.countDocuments();
  const apiFeatures=new ApiFeatures(SubcategoryModel.find(),req.query).pagination(documentsCounts).filter().search().limitFields().sort();
  //execute query
  const{mongooseQuery,paginationResult}=apiFeatures;
  const subcategories=await mongooseQuery;
  res.status(200).json({ results: subcategories.length, paginationResult,data: subcategories });
});
  
  //@desc Get specific Subcategory by id
  //@route GET subcategories/:id
  //@access public
  exports.getSubCategById = asyncHandler(async (req, res,next) => {
    const { id } = req.params;
    const subcategory = await SubcategoryModel.findById(id);
    if (!subcategory) {
      //res.status(404).json({ msg: `no category for this id ${id}` });
      return next(new ApiError( `no category for this id ${id}` ,404));
    }
    res.status(200).json({ data: subcategory });
  });
  

  exports.updateSubCateg = factory.updateOne(SubcategoryModel);

  //@desc delete specific subcategory
  //@route DELETE subcategories/:id
  //@access PRIVATE
  exports.deleteSubCateg = factory.deleteOne(SubcategoryModel);