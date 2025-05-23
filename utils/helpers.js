const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

module.exports = {
  generateId,
  formatDate,
};
