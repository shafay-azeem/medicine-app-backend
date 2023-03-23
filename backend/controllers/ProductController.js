const Product = require("../models/ProductModel");

const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

//Create --Post
exports.createProduct = asyncHandler(async (req, res, next) => {
    const { productName, productDescription, productCategory, productType, productImg, productVideo } = req.body;
    try {
        let product = await Product.create({
            userId: req.user._id,
            productName,
            productDescription,
            productCategory,
            productType,
            productImg,
            productVideo

        });
        return res.status(201).json({
            success: true,
            product,
            message: "Product Created Successfully",

        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});