/**
 * Validates an item object
 * @param {Object} item - The item to validate
 * @returns {Object} Validation result with isValid flag and errors array
 */
const validateItem = (item) => {
  const errors = [];
  console.log(`Validating item: ${JSON.stringify(item)}`);

  // Validate name
  if (!item.name || typeof item.name !== "string" || item.name.trim() === "") {
    const error = "Name is required and must be a non-empty string";
    console.log(`Validation error: ${error}`);
    errors.push(error);
  }

  // Validate description (optional but must be string if provided)
  if (item.description !== undefined && typeof item.description !== "string") {
    const error = "Description must be a string";
    console.log(`Validation error: ${error}`);
    errors.push(error);
  }

  const isValid = errors.length === 0;
  console.log(`Validation result: ${isValid ? "VALID" : "INVALID"}`);

  return {
    isValid,
    errors,
  };
};

module.exports = {
  validateItem,
};
