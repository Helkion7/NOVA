const {
  getItems,
  createItem,
  deleteItem,
} = require("../../controllers/itemsController");
const Item = require("../../models/Item");
const mongoose = require("mongoose");

// Mock the Item model
jest.mock("../../models/Item");

describe("Items Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    res = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe("getItems", () => {
    test("should return all items successfully", async () => {
      const mockItems = [
        { name: "Item 1", description: "Desc 1" },
        { name: "Item 2", description: "Desc 2" },
      ];
      Item.getAll.mockResolvedValue(mockItems);

      await getItems(req, res);

      expect(Item.getAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockItems);
    });

    test("should handle errors and return 500", async () => {
      Item.getAll.mockRejectedValue(new Error("Database error"));

      await getItems(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Failed to fetch items" });
    });
  });

  describe("createItem", () => {
    test("should create item with valid data", async () => {
      const itemData = { name: "Test Item", description: "Test desc" };
      const createdItem = { ...itemData, _id: "mockId", createdAt: new Date() };

      req.body = itemData;
      Item.create.mockResolvedValue(createdItem);

      await createItem(req, res);

      expect(Item.create).toHaveBeenCalledWith(itemData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdItem);
    });

    test("should return 400 for invalid data", async () => {
      req.body = { description: "No name provided" };

      await createItem(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: ["Name is required and must be a non-empty string"],
      });
    });

    test("should handle database errors", async () => {
      req.body = { name: "Test Item" };
      Item.create.mockRejectedValue(new Error("Database error"));

      await createItem(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Failed to create item" });
    });
  });

  describe("deleteItem", () => {
    test("should delete existing item successfully", async () => {
      const validId = new mongoose.Types.ObjectId().toString();
      req.params.id = validId;
      Item.delete.mockResolvedValue(true);

      await deleteItem(req, res);

      expect(Item.delete).toHaveBeenCalledWith(validId);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    test("should return 404 for invalid ObjectId", async () => {
      req.params.id = "invalid-id";

      await deleteItem(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Item not found" });
    });

    test("should return 404 for non-existing item", async () => {
      const validId = new mongoose.Types.ObjectId().toString();
      req.params.id = validId;
      Item.delete.mockResolvedValue(false);

      await deleteItem(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Item not found" });
    });

    test("should handle database errors", async () => {
      const validId = new mongoose.Types.ObjectId().toString();
      req.params.id = validId;
      Item.delete.mockRejectedValue(new Error("Database error"));

      await deleteItem(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Failed to delete item" });
    });
  });
});
