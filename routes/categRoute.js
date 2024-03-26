const express = require("express");
const {
  getCategories,
  createCateg,
  getCategById,
  updateCateg,
  deleteCateg,
} = require("../services/categoryService");
const {
  getCategoryValidator,
  createCategoryValidator,
  UpdateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");
const router = express.Router();

router.route("/").get(getCategories).post(createCategoryValidator, createCateg);

router
  .route("/:id")
  .get(getCategoryValidator, getCategById)
  .put(UpdateCategoryValidator, updateCateg)
  .delete(deleteCategoryValidator, deleteCateg);
module.exports = router;
