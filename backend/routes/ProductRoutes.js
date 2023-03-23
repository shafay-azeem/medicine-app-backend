const express = require("express");
const { createProduct, getAllProducts, updateProduct } = require("../controllers/ProductController");
const { isAuthenticatedUser } = require("../middleware/auth");


const router = express.Router();

//products
router.route("/createProduct").post(isAuthenticatedUser, createProduct);
router.route("/getAllProducts").get(getAllProducts);
router.route("/updateProduct/:prodId").put(isAuthenticatedUser, updateProduct);
router.route("/getSingleProduct/:prodId").get(getSingleProduct);
module.exports = router;
