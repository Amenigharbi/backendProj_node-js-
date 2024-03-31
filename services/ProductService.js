const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ProductModel = require("../models/ProductModel");
const ApiError=require('../utils/apiError');
const ApiFeatures=require('../utils/apiFeatures');
const factory=require('./handlersFactory');

//@desc get list of products
//@route GET /
//@access public
exports.getProducts = asyncHandler(async (req, res) => {
   //build query 
  const documentsCounts=await ProductModel.countDocuments();
  const apiFeatures=new ApiFeatures(ProductModel.find(),req.query).pagination(documentsCounts).filter().search("Products").limitFields().sort();
  //execute query
  const{mongooseQuery,paginationResult}=apiFeatures;
  const products=await mongooseQuery;
  res.status(200).json({ results: products.length, paginationResult,data: products });
});

//@desc Get specific product by id
//@route GET /:id
//@access public
exports.getProdById = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id).populate({path:"category",select:"name -_id"});
  if (!product) {
    return next(new ApiError( `no product for this id ${id}` ,404));
  }
  res.status(200).json({ data: product });
});

//@desc create product
//@route POST /
//@access private
exports.createProduct= factory.createOne(ProductModel);

//@desc update specific product
//@route PUT /:id
//@access PRIVATE
exports.updateProd= factory.updateOne(ProductModel);
//@desc delete specific product
//@route DELETE /:id
//@access PRIVATE
exports.deleteProd =factory.deleteOne(ProductModel);
