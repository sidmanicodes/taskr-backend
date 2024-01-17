const todoController = require("../controllers/todoController");
const express = require("express");
router = express.Router();

// Get all items
router.get("/", todoController.getAll);

// Create new item
router.post("/", todoController.create);

// Update item
router.put("/:id", todoController.update);

// Delete item
router.delete("/:id", todoController.delete);

module.exports = router;
