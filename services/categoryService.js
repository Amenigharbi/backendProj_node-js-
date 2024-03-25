const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const categoryModel = require("../models/categoryModel");

//@desc get list of categories
//@route GET /
//@access public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 3;
  const skip = (page - 1) * limit;
  const categories = await categoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

//@desc Get specific category by id
//@route GET /:id
//@access public
exports.getCategById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await categoryModel.findById(id);
  if (!category) {
    res.status(404).json({ msg: `no category for this id ${id}` });
  }
  res.status(200).json({ data: category });
});

//@desc create category
//@route POST /
//@access private
exports.createCateg = asyncHandler(async (req, res) => {
  const name = req.body.name;
  //async await
  const category = await categoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

//@desc update specific category
//@route PUT /:id
//@access PRIVATE
exports.updateCateg = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const categ = await categoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!categ) {
    res.status(404).json({ msg: `no category for this id ${id}` });
  }
  res.status(200).json({ data: categ });
});

//@desc delete specific category
//@route DELETE /:id
//@access PRIVATE
exports.deleteCateg = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const categ = await categoryModel.findOneAndDelete(id);

  if (!categ) {
    res.status(404).json({ msg: `no category for this id ${id}` });
  }
  res.status(204).send();
});
