const express = require("express");
const { getCategories, createCateg,getCategById,updateCateg,deleteCateg } = require("../services/categoryService");
const router = express.Router();
router.route('/').get(getCategories).post(createCateg);
router.route('/:id').get(getCategById);
router.route('/:id').put(updateCateg);
router.route('/:id').delete(deleteCateg);
module.exports = router;

