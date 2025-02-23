const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultController");

// Define routes
router.get("/", resultController.getResults);
router.get("/:classId", resultController.getClassResults);

module.exports = router;