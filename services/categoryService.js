const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const categoryModel = require("../models/categoryModel");
const ApiError=require('../utils/apiError');
const ApiFeatures=require('../utils/apiFeatures');
const factory=require('./handlersFactory');

//@desc get list of categories
//@route GET /
//@access public
exports.getCategories = asyncHandler(async (req, res) => {
  const documentsCounts=await categoryModel.countDocuments();
  const apiFeatures=new ApiFeatures(categoryModel.find(),req.query).pagination(documentsCounts).filter().search().limitFields().sort();
  //execute query
  const{mongooseQuery,paginationResult}=apiFeatures;
  const categories=await mongooseQuery;
  res.status(200).json({ results: categories.length, paginationResult,data: categories });
});
//@desc Get specific category by id
//@route GET /:id
//@access public
exports.getCategById = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
  const category = await categoryModel.findById(id);
  if (!category) {
    //res.status(404).json({ msg: `no category for this id ${id}` });
    return next(new ApiError( `no category for this id ${id}` ,404));
  }
  res.status(200).json({ data: category });
});

//@desc create category
//@route POST /
//@access private
exports.createCateg = factory.createOne(categoryModel);

//@desc update specific category
//@route PUT /:id
//@access PRIVATE
exports.updateCateg= factory.updateOne(categoryModel);


//@desc delete specific category
//@route DELETE /:id
//@access PRIVATE
exports.deleteCateg =factory.deleteOne(categoryModel);
