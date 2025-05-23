require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/database");
const seedDatabase = require("./utils/seedDatabase");
const apiRoutes = require("./routes/apiRoutes");
const loggingMiddleware = require("./middleware/logging");

const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(loggingMiddleware);

// Routes
app.use("/api", apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const errorDetails = {
    message: err.message || "Unknown error",
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query,
    timestamp: new Date().toISOString(),
  };

  console.error("SERVER ERROR:");
  console.error(JSON.stringify(errorDetails, null, 2));

  res.status(500).json({
    error: "Something went wrong!",
    details: err.message,
    path: req.originalUrl,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Seed database with initial data
  try {
    await seedDatabase();
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error.message);
  }
});

module.exports = app;
