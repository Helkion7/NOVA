const express = require("express");
const statusController = require("../controllers/statusController");
const itemsController = require("../controllers/itemsController");

const router = express.Router();

// Status route
router.get("/status", statusController.getStatus);

// Items routes
router.get("/items", itemsController.getItems);
router.post("/items", itemsController.createItem);
router.delete("/items/:id", itemsController.deleteItem);

module.exports = router;
