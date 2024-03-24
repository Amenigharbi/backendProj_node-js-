const express=require('express');
const {getCategories,createCateg}=require("../services/categoryService");
const router=express.Router();
router.route('/catgories').get(getCategories).post(createCateg);
module.exports=router;