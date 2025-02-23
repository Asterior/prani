const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Route for teacher login
router.post("/login", authController.login);

// Route for teacher logout
router.post("/logout", authController.logout);

module.exports = router;