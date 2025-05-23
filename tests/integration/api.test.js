const request = require("supertest");
const express = require("express");
const apiRoutes = require("../../routes/apiRoutes");
const Item = require("../../models/Item");

const app = express();
app.use(express.json());
app.use("/api", apiRoutes);

describe("API Integration Tests", () => {
  describe("GET /api/status", () => {
    test("should return status ok", async () => {
      const response = await request(app).get("/api/status").expect(200);

      expect(response.body).toEqual({ status: "ok" });
    });
  });

  describe("Items API", () => {
    describe("GET /api/items", () => {
      test("should return empty array when no items exist", async () => {
        const response = await request(app).get("/api/items").expect(200);

        expect(response.body).toEqual([]);
      });

      test("should return all items", async () => {
        await Item.create({ name: "Test Item 1" });
        await Item.create({ name: "Test Item 2" });

        const response = await request(app).get("/api/items").expect(200);

        expect(response.body).toHaveLength(2);
        expect(response.body[0].name).toBe("Test Item 2"); // Most recent first
        expect(response.body[1].name).toBe("Test Item 1");
      });
    });

    describe("POST /api/items", () => {
      test("should create new item with valid data", async () => {
        const itemData = {
          name: "New Test Item",
          description: "Test description",
        };

        const response = await request(app)
          .post("/api/items")
          .send(itemData)
          .expect(201);

        expect(response.body.name).toBe(itemData.name);
        expect(response.body.description).toBe(itemData.description);
        expect(response.body._id).toBeDefined();
        expect(response.body.createdAt).toBeDefined();
      });

      test("should return 400 for invalid data", async () => {
        const invalidData = {
          description: "Missing name",
        };

        const response = await request(app)
          .post("/api/items")
          .send(invalidData)
          .expect(400);

        expect(response.body.error).toContain(
          "Name is required and must be a non-empty string"
        );
      });
    });

    describe("DELETE /api/items/:id", () => {
      test("should delete existing item", async () => {
        const item = await Item.create({ name: "Item to delete" });

        await request(app).delete(`/api/items/${item._id}`).expect(204);

        const deletedItem = await Item.findById(item._id);
        expect(deletedItem).toBeNull();
      });

      test("should return 404 for non-existing item", async () => {
        const fakeId = "507f1f77bcf86cd799439011";

        const response = await request(app)
          .delete(`/api/items/${fakeId}`)
          .expect(404);

        expect(response.body.error).toBe("Item not found");
      });

      test("should return 404 for invalid ObjectId", async () => {
        const response = await request(app)
          .delete("/api/items/invalid-id")
          .expect(404);

        expect(response.body.error).toBe("Item not found");
      });
    });
  });
});
