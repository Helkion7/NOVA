const mongoose = require("mongoose");

const seedDatabase = async () => {
  const ItemModel = mongoose.model("Item");

  // Check if items already exist
  const existingItems = await ItemModel.countDocuments();
  if (existingItems > 0) {
    console.log("Database already has data, skipping seed");
    return;
  }

  const sampleItems = [
    {
      name: "Sample Item 1",
      description: "This is a sample item",
    },
    {
      name: "Sample Item 2",
      description: "Another sample item",
    },
    {
      name: "Advanced Widget",
      description: "A complex widget with multiple features",
    },
    {
      name: "Simple Tool",
      description: "Basic utility tool for everyday use",
    },
    {
      name: "Premium Service",
      description: "High-quality service with extended support",
    },
  ];

  await ItemModel.insertMany(sampleItems);
  console.log("Database seeded with sample items");
};

module.exports = seedDatabase;
