const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Get the auth header from the request header
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // Verify it is a bearer token in the authorization header
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "User is unauthorized, authorization token is required" });
    }

    // Get the token
    const token = authHeader.split(" ")[1];

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Forbidden, invalid token" });
      }
      
      // Attach the user ID to the request object
      req.user = decoded.userId;
      
      // Proceed to the next middleware or route handler
      next();
    });
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = authMiddleware;
