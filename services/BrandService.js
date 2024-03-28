const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const BrandModel = require("../models/BrandModel");
const ApiError=require('../utils/apiError');

//@desc get list of brands
//@route GET /brands
//@access public
exports.getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 3;
  const skip = (page - 1) * limit;
  const Brands = await BrandModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: Brands.length, page, data: Brands });
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
  const { id } = req.params;
  const { name } = req.body;
  const brand = await BrandModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!brand) {
    return next(new ApiError( `no brand for this id ${id}` ,404));
  }
  res.status(200).json({ data: brand });
});

//@desc delete specific brand
//@route DELETE /:id
//@access PRIVATE
exports.deleteBrand = asyncHandler(async (req, res,next ) => {
  const { id } = req.params;
  const brand = await BrandModel.findOneAndDelete(id);

  if (!brand) {
    return next(new ApiError( `no brand for this id ${id}` ,404));
  }
  res.status(204).send();
});
