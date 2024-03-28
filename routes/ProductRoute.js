const express = require("express");
const {
  getProducts,
  getProdById,
  createProduct,
  deleteProd,
  updateProd,
} = require("../services/ProductService");
const {
  getProductValidator,
  updateProductValidator,
  createProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

const router = express.Router();
router.route("/").get(getProducts).post(createProductValidator,createProduct);

router
  .route("/:id")
  .get(getProductValidator,getProdById)
  .put(updateProductValidator,updateProd)
  .delete(deleteProductValidator,deleteProd);
module.exports = router;
