const fs = require("fs");
const path = require("path");
const loggingMiddleware = require("../../middleware/logging");

// Mock fs module
jest.mock("fs");

describe("Logging Middleware", () => {
  let req, res, next;
  const expectedLogFile = path.join("/var/logs", "api.log");

  beforeEach(() => {
    req = {
      originalUrl: "/api/test",
    };
    res = {};
    next = jest.fn();

    // Reset mocks
    jest.clearAllMocks();
    fs.existsSync.mockReturnValue(true);
    fs.mkdirSync.mockImplementation(() => {});
    fs.appendFile.mockImplementation((file, data, callback) => {
      callback(null);
    });
  });

  test("should call next() after logging", () => {
    loggingMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test("should append log entry to file", (done) => {
    loggingMiddleware(req, res, next);

    // Give some time for async operation
    setTimeout(() => {
      expect(fs.appendFile).toHaveBeenCalled();
      const logCall = fs.appendFile.mock.calls[0];
      expect(logCall[0]).toBe(expectedLogFile);
      expect(logCall[1]).toContain("/api/test");
      done();
    }, 10);
  });

  test("should create log directory if it does not exist", () => {
    fs.existsSync.mockReturnValue(false);

    loggingMiddleware(req, res, next);

    expect(fs.mkdirSync).toHaveBeenCalledWith("/var/logs", { recursive: true });
  });

  test("should handle file write errors gracefully", (done) => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    fs.appendFile.mockImplementation((file, data, callback) => {
      callback(new Error("Write failed"));
    });

    loggingMiddleware(req, res, next);

    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to write to log file:",
        expect.any(Error)
      );
      consoleSpy.mockRestore();
      done();
    }, 10);
  });
});
