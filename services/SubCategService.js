const SubcategoryModel = require("../models/subCategoryModel");
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

exports.getSubCategories = factory.getAll(SubcategoryModel);
  
  //@desc Get specific Subcategory by id
  //@route GET subcategories/:id
  //@access public
  exports.getSubCategById = factory.getOne(SubcategoryModel)
  

  exports.updateSubCateg = factory.updateOne(SubcategoryModel);

  //@desc delete specific subcategory
  //@route DELETE subcategories/:id
  //@access PRIVATE
  exports.deleteSubCateg = factory.deleteOne(SubcategoryModel);