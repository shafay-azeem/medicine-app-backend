const User = require("../models/UserModel");

const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

//SignUp User --Post
exports.createUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        let user;
        user = await User.findOne({
            email: email
        });
        if (user) {
            const error = new Error(
                "User Already Exist with this Email"
            );
            error.statusCode = 400;
            throw error;
        }
        user = await User.create({
            name,
            email,
            password,

        });
        return res.status(201).json({
            success: true,
            user,
            message: "Signup Successfully",
            token: user.getJwtToken(user._id),
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});

//login --Post
exports.loginUser = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            const error = new Error("Please Enter Your All Fields");
            error.statusCode = 422;
            throw error;
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            const error = new Error("User is not found with this email");
            error.statusCode = 401;
            throw error;
        }
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            const error = new Error("Password is in correct");
            error.statusCode = 401;
            throw error;
        }
        return res.status(200).json({
            success: true,
            user,
            message: "Login Successfully",
            token: user.getJwtToken(user._id),
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});




//Update User --Post
exports.updateProfile = asyncHandler(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.resName,
        password: req.body.password,

    };
    try {
        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        return res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});

//Delete User --Post
exports.deleteUser = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            const error = new Error("User is not found with this id");
            error.statusCode = 404;
            throw error;
        }

        await user.remove();
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});

//Get All Users --Get
exports.getAllUsers = asyncHandler(async (req, res, next) => {
    ///To execute the query and retrieve the result set, you can call the exec() method on the Query object. The exec() method returns a Promise that resolves with an array of documents that match the query criteria.

    try {
        const users = await User.find().exec();
        if (!users) {
            const error = new Error("Users Not Found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            users,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});

//Delete All Users
exports.deleteAllUsers = asyncHandler(async (req, res, next) => {
    try {
        let users;
        users = await User.deleteMany();
        res.status(200).json({
            success: true,
            message: "All Users Deleted Successfully",
        });
    } catch (error) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});

//NOT IN USE
//User Detail --Get
exports.userDetail = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }

        req.user = decoded;
        const stringId = req.user.id;

        if (mongoose.Types.ObjectId.isValid(stringId)) {
            const objectId = mongoose.Types.ObjectId(stringId);
            User.findById(objectId)
                .then((user) => {
                    if (!user) {
                        return res.status(404).json({
                            success: false,
                            message: "User not found",
                        });
                    }
                    res.status(200).json({
                        success: true,
                        user,
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        success: false,
                        message: "Internal Server Error",
                        error,
                    });
                });
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid Id passed",
            });
        }
    });
});


exports.getuserDetailById = asyncHandler(async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(new mongoose.Types.ObjectId(userId));
        if (!user) {
            const error = new Error("User Not Found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            user: user,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
