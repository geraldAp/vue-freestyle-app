const jwt = require("jsonwebtoken");

const authMiddleWare = async (req, res, next) => {
  // get the auth header frm the request header
  const authHeder = req.headers.authorization || req.headers.Authorization;

  // verify it is a bearer token in the authorization header
  if (!authHeder?.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ error: "User is unauthorized authorization token is required" });
  }
  // get the token
  const token = authHeder.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.sendStatus(403);
    }
    req.user = decoded.userId;
    next();
  });
};

module.exports = authMiddleWare;
