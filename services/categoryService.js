const categoryModel = require("../models/categoryModel");
const factory=require('./handlersFactory');

//@desc get list of categories
//@route GET /
//@access public
exports.getCategories = factory.getAll(categoryModel);
//@desc Get specific category by id
//@route GET /:id
//@access public
exports.getCategById = factory.getOne(categoryModel);

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
