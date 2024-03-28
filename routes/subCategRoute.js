const express = require("express");

const {createSubCategoryValidator,UpdateSubCategoryValidator,deleteSubCategoryValidator,getSubCategoryValidator}=require("../utils/validators/SubcategoryValidator")
const {
  createSubCateg,
  getSubCategById,
  getSubCategories,
  updateSubCateg,
  deleteSubCateg,
  setCategoryIdToBody,
  createFilterObj,

} = require("../services/SubCategService");

//mergeParams allow us to access paramaters on other routers 
//ex: we need to access categoryid from category router 
const router = express.Router({mergeParams: true});
router
 .route("/")
 .post(setCategoryIdToBody,createSubCategoryValidator,createSubCateg)
 .get(createFilterObj,getSubCategories);
router
 .route("/:id")
 .get(getSubCategoryValidator,getSubCategById)
 .put(UpdateSubCategoryValidator,updateSubCateg)
 .delete(deleteSubCategoryValidator,deleteSubCateg);
module.exports=router;

