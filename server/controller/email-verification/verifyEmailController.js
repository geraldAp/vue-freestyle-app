const fs = require("fs");
const path = require("path");
const User = require("../../model/user");
const jwt = require("jsonwebtoken");
const Verification = require("../../model/verification");

const getVerificationEmailPage = async (req, res) => {
  const { token } = req.query;
  console.log("Verification Token : ", token);
  // Verify the token to ensure it's valid before rendering the page
  try {
    jwt.verify(token, process.env.VERIFICATION_TOKEN_SECRET);
    console.log("Current Directory: ", __dirname);
    const filePath = path.join(__dirname, "../../views/verificationPage.html");
    console.log(filePath);
    fs.readFile(filePath, "utf8", (err, html) => {
      if (err) {
        return res.status(500).send("Server error");
      }
      // Replace the placeholder with the actual token
      const renderedHtml = html.replace("{{token}}", token);
      res.send(renderedHtml);
    });
  } catch (error) {
    return res.status(400).send("Invalid or expired token");
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.VERIFICATION_TOKEN_SECRET);
    const verification = await Verification.findOne({
      userId: decoded.userId,
      token,
    });
    console.log("Finding Verification : ", verification);
    if (!verification) {
      return res.status(400).send("Invalid token or token expired");
    }

    const user = await User.findById(decoded.userId);
    console.log("Finding User : ", user);
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.isVerified = true;
    await user.save();

    await Verification.deleteOne({ userId: decoded.userId });
    console.log("Email verified successfully");
    const filePath = path.join(
      __dirname,
      "../../views/verificationSuccessPage.html"
    );
    fs.readFile(filePath, "utf8", (err, html) => {
      if (err) {
        return res.status(500).send("Server error");
      }
      return res.send(html);
    });
  } catch (error) {
    console.error("Email verification error:", error);
    return res.status(400).send("Invalid or expired token");
  }
};

module.exports = { getVerificationEmailPage, verifyEmail };
