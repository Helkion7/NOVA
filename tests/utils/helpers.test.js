const { generateId, formatDate } = require("../../utils/helpers");

describe("helpers", () => {
  describe("generateId", () => {
    test("should generate a unique string ID", () => {
      const id1 = generateId();
      const id2 = generateId();

      expect(typeof id1).toBe("string");
      expect(typeof id2).toBe("string");
      expect(id1).not.toBe(id2);
    });

    test("should generate ID with expected length", () => {
      const id = generateId();
      expect(id.length).toBeGreaterThan(10);
    });
  });

  describe("formatDate", () => {
    test("should format date to YYYY-MM-DD format", () => {
      const testDate = new Date("2023-12-25T10:30:00Z");
      const formatted = formatDate(testDate);

      expect(formatted).toBe("2023-12-25");
    });

    test("should handle different dates correctly", () => {
      const testDate = new Date("2024-01-01T00:00:00Z");
      const formatted = formatDate(testDate);

      expect(formatted).toBe("2024-01-01");
    });
  });
});
