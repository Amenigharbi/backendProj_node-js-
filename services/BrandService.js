const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const BrandModel = require("../models/BrandModel");
const ApiError=require('../utils/apiError');
const ApiFeatures=require('../utils/apiFeatures');
const factory=require('./handlersFactory');
//@desc get list of brands
//@route GET /brands
//@access public
exports.getBrands = asyncHandler(async (req, res) => {
   //build query 
   const documentsCounts=await BrandModel.countDocuments();
   const apiFeatures=new ApiFeatures(BrandModel.find(),req.query).pagination(documentsCounts).filter().search().limitFields().sort();

   const{mongooseQuery,paginationResult}=apiFeatures;
   const brands=await mongooseQuery;
   res.status(200).json({ results: brands.length, paginationResult,data: brands });
});

//@desc Get specific brand by id
//@route GET /:id
//@access public
exports.getBrandById = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
  const Brand = await BrandModel.findById(id);
  if (!Brand) {
    return next(new ApiError( `no Brandfor this id ${id}` ,404));
  }
  res.status(200).json({ data: Brand });
});

//@desc create brand
//@route POST /
//@access private
exports.createBrand = asyncHandler(async (req, res) => {
  const {name} = req.body;
  //async await
  const brand = await BrandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});


//@desc update specific brand
//@route PUT /:id
//@access PRIVATE
exports.updateBrand= asyncHandler(async (req, res,next) => {
  const brand = await BrandModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true }
  );

  if (!brand) {
    return next(new ApiError( `no brand for this id ${req.params.id}` ,404));
  }
  res.status(200).json({ data: brand });
});

//@desc delete specific brand
//@route DELETE /:id
//@access PRIVATE
exports.deleteBrand = factory.deleteOne(BrandModel);
