const express = require("express");
const {
  getAllUsers,
  registerController,
  loginUsers,
} = require("../controllers/userController");

// router object
const router = express.Router();

//Create User || Post
router.post("/register", registerController);

//Get All User || Get
router.get("/all-users", getAllUsers);

//Login USer || Post
router.post("/login", loginUsers);
module.exports = router;
