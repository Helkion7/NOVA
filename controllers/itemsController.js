const Item = require("../models/Item");
const { validateItem } = require("../utils/validation");
const mongoose = require("mongoose");

const getItems = async (req, res) => {
  console.log("GET /items request received");
  try {
    const items = await Item.getAll();
    console.log(`Retrieved ${items.length} items successfully`);
    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch items", details: error.message });
  }
};

const createItem = async (req, res) => {
  console.log("POST /items request received with body:", req.body);
  try {
    const validation = validateItem(req.body);
    if (!validation.isValid) {
      console.log("Validation failed:", validation.errors);
      return res.status(400).json({
        error: "Validation failed",
        details: validation.errors,
      });
    }

    const newItem = await Item.create(req.body);
    console.log("Item created successfully:", newItem);
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({
      error: "Failed to create item",
      details: error.message,
    });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  console.log(`DELETE /items/${id} request received`);

  try {
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(`Invalid ObjectId format: ${id}`);
      return res.status(400).json({
        error: "Invalid item ID format",
        details: "The provided ID is not a valid MongoDB ObjectId",
      });
    }

    const deleted = await Item.delete(id);

    if (!deleted) {
      console.log(`Item not found with ID: ${id}`);
      return res.status(404).json({
        error: "Item not found",
        details: `No item exists with ID: ${id}`,
      });
    }

    console.log(`Item ${id} deleted successfully`);
    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting item ${id}:`, error);
    res.status(500).json({
      error: "Failed to delete item",
      details: error.message,
    });
  }
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
};
