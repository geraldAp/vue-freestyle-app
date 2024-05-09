const User = require("../model/user");
const RefreshToken = require("../model/refreshToken");
const validateUserCredentials = require("../helpers/validators");
const { comparePassword } = require("../helpers/passwordHelpers");
const {
  generateRefreshToken,
  generateAccessToken,
} = require("../helpers/generateTokens");
const { use } = require("../routes/authRoute");
const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    const { email: validatedEmail, password: validatedPassword } =
      validateUserCredentials(email, password);
    if (validatedEmail.error) {
      console.error("Email validation error:", validatedEmail.error.message);
      throw new Error(validatedEmail.error.message);
    }
    if (validatedPassword.error) {
      console.error(
        "Password validation error:",
        validatedPassword.error.message
      );
      throw new Error(validatedPassword.error.message);
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist kindly Signup " });
    }
    // hash password
    const comparedPassword = await comparePassword(password, user.password);

    if (!comparedPassword) {
      return res
        .status(401)
        .json({ message: "Username or password is incorrect " });
    }
    // Generate jwt tokens
    const refreshToken = generateRefreshToken(user._id);

    // store the refresh token
    await RefreshToken.create({ token: refreshToken, userId: user._id });

    const accessToken = generateAccessToken(user._id);

    res.status(200).json({ refreshToken, accessToken, email });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = handleLogin;
