const { validateItem } = require("../../utils/validation");

describe("validateItem", () => {
  describe("valid data", () => {
    test("should return valid for correct item data", () => {
      const validItem = {
        name: "Test Item",
        description: "Test description",
      };

      const result = validateItem(validItem);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test("should return valid for item without description", () => {
      const validItem = {
        name: "Test Item",
      };

      const result = validateItem(validItem);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe("invalid data", () => {
    test("should return invalid for missing name", () => {
      const invalidItem = {
        description: "Test description",
      };

      const result = validateItem(invalidItem);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "Name is required and must be a non-empty string"
      );
    });

    test("should return invalid for empty name", () => {
      const invalidItem = {
        name: "",
        description: "Test description",
      };

      const result = validateItem(invalidItem);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "Name is required and must be a non-empty string"
      );
    });

    test("should return invalid for non-string name", () => {
      const invalidItem = {
        name: 123,
        description: "Test description",
      };

      const result = validateItem(invalidItem);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "Name is required and must be a non-empty string"
      );
    });

    test("should return invalid for non-string description", () => {
      const invalidItem = {
        name: "Test Item",
        description: 123,
      };

      const result = validateItem(invalidItem);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Description must be a string");
    });
  });
});
