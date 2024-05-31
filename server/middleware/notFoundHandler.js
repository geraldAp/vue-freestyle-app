const notFoundHandler = (req, res, next) => {
  res.status(404).json({ error: "Route Not Found " });
};

module.exports = notFoundHandler;
