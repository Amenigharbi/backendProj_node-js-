const Brand = require("../models/BrandModel");
const factory=require('./handlersFactory');
//@desc get list of brands
//@route GET /brands
//@access public
exports.getBrands = factory.getAll(Brand);

//@desc Get specific brand by id
//@route GET /:id
//@access public
exports.getBrandById = factory.getOne(Brand);

//@desc create brand
//@route POST /
//@access private
exports.createBrand = factory.createOne(Brand);

//@desc update specific brand
//@route PUT /:id
//@access PRIVATE
exports.updateBrand= factory.updateOne(Brand);

//@desc delete specific brand
//@route DELETE /:id
//@access PRIVATE
exports.deleteBrand = factory.deleteOne(Brand);
