const labelController = require("../controllers/labelController");
const express = require("express");
router = express.Router();

// Get all items
router.get("/", labelController.getAll);

// Create new item
router.post("/", labelController.create);

// Update item
router.put("/:id", labelController.update);

// Delete item
router.delete("/:id", labelController.delete);

module.exports = router;
