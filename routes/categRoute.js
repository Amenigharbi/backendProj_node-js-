const express = require("express");
const { getCategories, createCateg } = require("../services/categoryService");
const router = express.Router();
router.route('/').get(getCategories).post(createCateg);
module.exports = router;
