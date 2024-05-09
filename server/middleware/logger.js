const logger = (req, res, next) => {
  console.log(req.method, req.url, req.ip, req.path);
  next();
};

module.exports = logger;
