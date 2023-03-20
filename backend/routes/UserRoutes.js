const express = require("express");
const { createUser, loginUser, userDetail, getAllUsers, updateProfile, deleteUser, deleteAllUsers, getuserDetailById } = require("../controllers/UserController");

const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

//user
router.route("/createUser").post(createUser);
router.route("/login").post(loginUser);
router.route("/userDetail").get(isAuthenticatedUser, userDetail);
router.route("/getAllUsers").get(getAllUsers);
router.route("/updateProfile").put(isAuthenticatedUser, updateProfile);
router.route("/deleteUser/:id").delete(isAuthenticatedUser, deleteUser);
router.route("/deleteAllUsers").delete(deleteAllUsers);
router.route("/getuserDetailById/:userId").get(getuserDetailById);

module.exports = router;
