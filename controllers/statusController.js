const getStatus = (req, res) => {
  res.json({ status: "ok" });
};

module.exports = {
  getStatus,
};
