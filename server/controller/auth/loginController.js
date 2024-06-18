const User = require("../../model/user");
const RefreshToken = require("../../model/refreshToken");
const { validateUserLoginCredentials } = require("../../helpers/validators");
const { comparePassword } = require("../../helpers/passwordHelpers");
const {
  generateRefreshToken,
  generateAccessToken,
} = require("../../helpers/generateTokens");
const { use } = require("bcrypt/promises");
const handleLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Validation
    const { userName: validatedUserName, password: validatedPassword } =
      validateUserLoginCredentials(userName, password);
    if (validatedUserName.error) {
      console.error(
        "User Name validation error:",
        validatedUserName.error.message
      );
      throw new Error(validatedUserName.error.message);
    }
    if (validatedPassword.error) {
      console.error(
        "Password validation error:",
        validatedPassword.error.message
      );
      throw new Error(validatedPassword.error.message);
    }

    // Check if the user exists
    const user = await User.findOne({ userName });
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

    const userInfo = {
      firstName: user.firstName,
      lastName: user.lastName,
      userName,
      email: user.email,
    };

    res.status(200).json({ refreshToken, accessToken, userInfo });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = handleLogin;
