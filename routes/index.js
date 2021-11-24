const express = require("express");
const router =
  new express.Router();
const ProductController = require("../controller/product");
// TO add new Product
router.post(
  "/addProduct",
  ProductController.addProduct
);
router.get(
  "/getProducts",
  ProductController.getProducts
);
router.get(
  "/getProduct",
  ProductController.getProductById
);
router.get(
  "/searchProducts",
  ProductController.searchProducts
);
router.post(
  "/updateProduct",
  ProductController.updateProduct
);

module.exports = router;
