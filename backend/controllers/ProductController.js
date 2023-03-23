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
        return res.status(200).json({
            success: true,
            products,
            message: "Products Fetched Successfully",

        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});

//get ALl Products --Get
exports.updateProduct = asyncHandler(async (req, res, next) => {
    let productId = req.params.prodId
    const { productName, productDescription, productCategory, productType, productImg, productVideo } = req.body;
    const newProductData = {
        productName: productName,
        productDescription: productDescription,
        productCategory: productCategory,
        productType: productType,
        productImg: productImg,
        productVideo: productVideo

    };
    try {
        const product = await Product.findByIdAndUpdate(productId, newProductData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        return res.status(200).json({
            success: true,
            product,
            message: "Product Updated Successfuly"
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});


//get ALl Products --Get
exports.getSingleProduct = asyncHandler(async (req, res, next) => {
    let productId = req.params.prodId

    try {
        const product = await Product.findById(productId);
        return res.status(200).json({
            success: true,
            product,
            message: "Product Fetched Successfuly"
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});

//get ALl Products --Get
exports.deleteProduct = asyncHandler(async (req, res, next) => {
    let productId = req.params.prodId

    try {
        const product = await Product.find().exec()
        let updatedProducts = product.pull({ _id: productId })
        await updatedProducts.save()
        return res.status(200).json({
            success: true,
            message: "Product deleted Successfuly"
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});