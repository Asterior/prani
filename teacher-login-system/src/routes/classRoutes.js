const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");

// Route to select a class
router.get("/select", classController.selectClass);

// Route to get results for a selected class
router.get("/:classId/results", classController.getClassResults);

module.exports = router;