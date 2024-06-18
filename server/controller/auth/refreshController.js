const jwt = require('jsonwebtoken')
const RefreshToken = require("../../model/refreshToken");

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // Check if refresh token exists in the database
    const tokenExists = await RefreshToken.exists({ token: refreshToken });
    if (!tokenExists) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    // Verify refresh token
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Refresh token expired" });
      }
      // For other errors, 
      console.error("Error verifying refresh token:", err);
      return res.status(500).json({ error: "Internal Server Error testing one two" });
    }

    // Generate new access token
    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // Send new access token in the response
    res.json({ accessToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ error: "Invalid refresh token" });
  }
};

module.exports = refresh;
