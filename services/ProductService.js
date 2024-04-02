const ProductModel = require("../models/ProductModel");
const factory=require('./handlersFactory');

//@desc get list of products
//@route GET /
//@access public
exports.getProducts = factory.getAll(ProductModel,"Products");

//@desc Get specific product by id
//@route GET /:id
//@access public
exports.getProdById = factory.getOne(ProductModel)

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
