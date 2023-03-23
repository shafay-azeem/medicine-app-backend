const express = require("express");
const { createProduct, getAllProducts, updateProduct, getSingleProduct, deleteProduct } = require("../controllers/ProductController");
const { isAuthenticatedUser } = require("../middleware/auth");


const router = express.Router();

//products
router.route("/createProduct").post(isAuthenticatedUser, createProduct);
router.route("/getAllProducts").get(getAllProducts);
router.route("/updateProduct/:prodId").put(isAuthenticatedUser, updateProduct);
router.route("/getSingleProduct/:prodId").get(getSingleProduct);
router.route("/deleteProduct/:prodId").delete(isAuthenticatedUser, deleteProduct);
module.exports = router;
