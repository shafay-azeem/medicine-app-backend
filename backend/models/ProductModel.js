const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    productName: {
        type: String,
    },
    productDescription: {
        type: String,
    },
    productCategory: {
        type: String,
    },
    productType: {
        type: String,
    },
    productImg: {
        type: String,
    },
    productVideo: {
        type: String,
    },


}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;