const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubcategoryModel = require("../models/subCategoryModel");
const ApiError=require('../utils/apiError');


exports.createSubCateg = asyncHandler(async (req, res) => {
  const {name,category} = req.body;
  //async await
  const Subcategory = await SubcategoryModel.create({ name, slug: slugify(name),category });
  res.status(201).json({ data: Subcategory });
});

exports.getSubCategories = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 3;
    const skip = (page - 1) * limit;
    const categories = await SubcategoryModel.find({}).skip(skip).limit(limit);
    res.status(200).json({ results: categories.length, page, data: categories });
  });
  
  //@desc Get specific Subcategory by id
  //@route GET /:id
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
  

  exports.updateSubCateg = asyncHandler(async (req, res,next) => {
    const { id } = req.params;
    const { name } = req.body;
    const subcateg = await SubcategoryModel.findOneAndUpdate(
      { _id: id },
      { name, slug: slugify(name) },
      { new: true }
    );
  
    if (!subcateg) {
      return next(new ApiError( `no category for this id ${id}` ,404));
    }
    res.status(200).json({ data: subcateg });
  });
  

  //@desc delete specific subcategory
  //@route DELETE /:id
  //@access PRIVATE
  exports.deleteSubCateg = asyncHandler(async (req, res,next ) => {
    const { id } = req.params;
    const subcateg = await SubcategoryModel.findOneAndDelete(id);
    if (!subcateg) {
      return next(new ApiError( `no category for this id ${id}` ,404));
    }
    res.status(204).send();
  });