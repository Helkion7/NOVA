const Item = require("../../models/Item");
const mongoose = require("mongoose");

describe("Item Model", () => {
  describe("create", () => {
    test("should create a new item with valid data", async () => {
      const itemData = {
        name: "Test Item",
        description: "Test description",
      };

      const createdItem = await Item.create(itemData);

      expect(createdItem.name).toBe(itemData.name);
      expect(createdItem.description).toBe(itemData.description);
      expect(createdItem.createdAt).toBeDefined();
      expect(createdItem._id).toBeDefined();
    });

    test("should create item without description", async () => {
      const itemData = {
        name: "Test Item",
      };

      const createdItem = await Item.create(itemData);

      expect(createdItem.name).toBe(itemData.name);
      expect(createdItem.description).toBeUndefined();
    });

    test("should throw error for missing required fields", async () => {
      const itemData = {
        description: "Test description",
      };

      await expect(Item.create(itemData)).rejects.toThrow();
    });
  });

  describe("getAll", () => {
    test("should return empty array when no items exist", async () => {
      const items = await Item.getAll();
      expect(items).toEqual([]);
    });

    test("should return all items sorted by createdAt desc", async () => {
      const item1 = await Item.create({ name: "Item 1" });
      const item2 = await Item.create({ name: "Item 2" });
      const item3 = await Item.create({ name: "Item 3" });

      const items = await Item.getAll();

      expect(items).toHaveLength(3);
      expect(items[0].name).toBe("Item 3");
      expect(items[2].name).toBe("Item 1");
    });
  });

  describe("delete", () => {
    test("should delete existing item and return true", async () => {
      const createdItem = await Item.create({ name: "Test Item" });

      const deleted = await Item.delete(createdItem._id);

      expect(deleted).toBe(true);

      const foundItem = await Item.findById(createdItem._id);
      expect(foundItem).toBeNull();
    });

    test("should return false for non-existing item", async () => {
      const fakeId = new mongoose.Types.ObjectId();

      const deleted = await Item.delete(fakeId);

      expect(deleted).toBe(false);
    });
  });

  describe("findById", () => {
    test("should find existing item by ID", async () => {
      const createdItem = await Item.create({ name: "Test Item" });

      const foundItem = await Item.findById(createdItem._id);

      expect(foundItem).toBeTruthy();
      expect(foundItem.name).toBe("Test Item");
    });

    test("should return null for non-existing ID", async () => {
      const fakeId = new mongoose.Types.ObjectId();

      const foundItem = await Item.findById(fakeId);

      expect(foundItem).toBeNull();
    });
  });
});
