const mongoose = require("mongoose");
const { generateId } = require("../utils/helpers");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ItemModel = mongoose.model("Item", itemSchema);

class Item {
  static async getAll() {
    return await ItemModel.find().sort({ createdAt: -1 });
  }

  static async create(itemData) {
    const newItem = new ItemModel(itemData);
    return await newItem.save();
  }

  static async delete(id) {
    const result = await ItemModel.findByIdAndDelete(id);
    return result !== null;
  }

  static async findById(id) {
    return await ItemModel.findById(id);
  }
}

module.exports = Item;
