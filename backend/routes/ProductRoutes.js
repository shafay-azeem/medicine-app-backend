const express = require("express");
const { createProduct, getAllProducts } = require("../controllers/ProductController");
const { isAuthenticatedUser } = require("../middleware/auth");


const router = express.Router();

//products
router.route("/createProduct").post(isAuthenticatedUser, createProduct);
router.route("/createProduct").get(getAllProducts);

module.exports = router;
