const express = require("express");
const {
  getBrands,
  createBrand,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require("../services/BrandService");
const {
  getBrandValidator,
  createBrandValidator,
  UpdateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/BrandValidator");
const router = express.Router();
router.route("/").get(getBrands).post(createBrandValidator, createBrand);

router
  .route("/:id")
  .get(getBrandValidator, getBrandById)
  .put(UpdateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);
module.exports = router;
