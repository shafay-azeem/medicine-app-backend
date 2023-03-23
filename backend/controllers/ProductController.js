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

//get ALl Products --Get
exports.getAllProducts = asyncHandler(async (req, res, next) => {

    try {
        let products = await Product.find().exec()


        if (!products) {
            const error = new Error(
                "product not found"
            );
            error.statusCode = 404;
            throw error;
        }
        return res.status(201).json({
            success: true,
            products,
            message: "Product Created Successfully",

        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});