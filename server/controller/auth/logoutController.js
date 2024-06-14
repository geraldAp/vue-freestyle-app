const jwt = require("jsonwebtoken");
const RefreshToken = require("../model/refreshToken");
const handleLogout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    console.log(refreshToken, "token")
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (decoded) {
      // Delete refresh token from database
      await RefreshToken.findOneAndDelete({ token: refreshToken });
    } else {
      res.status(400).json({ error: "Invalid Refresh token" });
    }

    res.json({ message: "Logout successful" });
  } catch (err) {
    console.error("Error logging out:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = handleLogout;
