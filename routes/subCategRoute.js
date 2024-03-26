const express = require("express");
const router = express.Router();
const {createSubCategoryValidator,UpdateSubCategoryValidator,deleteSubCategoryValidator,getSubCategoryValidator}=require("../utils/validators/SubcategoryValidator")
const {
  createSubCateg,
  getSubCategById,
  getSubCategories,
  updateSubCateg,
  deleteSubCateg,
} = require("../services/SubCategService");

router
 .route("/")
 .post(createSubCategoryValidator,createSubCateg)
 .get(getSubCategories);
router
 .route("/:id")
 .get(getSubCategoryValidator,getSubCategById)
 .put(UpdateSubCategoryValidator,updateSubCateg)
 .delete(deleteSubCategoryValidator,deleteSubCateg);
module.exports=router;

