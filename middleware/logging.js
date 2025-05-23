const fs = require("fs");
const path = require("path");

const LOG_DIR = "/var/logs";
const LOG_FILE = path.join(LOG_DIR, "api.log");

const loggingMiddleware = (req, res, next) => {
  // Ensure log directory exists
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }

  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const time = now.toTimeString().split(" ")[0];

  // Capture request start time
  req.requestTime = Date.now();

  // Track original JSON method to enhance it
  const originalJson = res.json;

  // Override res.json to log response data
  res.json = function (data) {
    const responseTime = Date.now() - req.requestTime;
    const statusCode = res.statusCode;

    // Log request and response info to console for Postman visibility
    console.log(
      `[${time}] ${req.method} ${req.originalUrl} - Status: ${statusCode} - ${responseTime}ms`
    );
    console.log(`Request Headers: ${JSON.stringify(req.headers)}`);

    if (["POST", "PUT", "PATCH"].includes(req.method)) {
      console.log(`Request Body: ${JSON.stringify(req.body)}`);
    }

    console.log(`Response: ${JSON.stringify(data)}`);
    console.log("------------------------------");

    // Create detailed log entry
    const logEntry = `${time}.${day}.${month}.${year} - ${req.method} ${req.originalUrl} - Status: ${statusCode} - ${responseTime}ms\n`;

    fs.appendFile(LOG_FILE, logEntry, (err) => {
      if (err) {
        console.error("Failed to write to log file:", err);
      }
    });

    // Call the original json method
    return originalJson.call(this, data);
  };

  next();
};

module.exports = loggingMiddleware;
