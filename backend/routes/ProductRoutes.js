const express = require("express");
const { createProduct } = require("../controllers/ProductController");
const { isAuthenticatedUser } = require("../middleware/auth");


const router = express.Router();

//products
router.route("/createProduct").post(isAuthenticatedUser, createProduct);

module.exports = router;
