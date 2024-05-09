const User = require("../model/user");
const validateUserCredentials = require("../helpers/validators");
const { encryptPassword } = require("../helpers/passwordHelpers");
const signUp = async (req, res) => {
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

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists kindly login" });
    }
    // hash password
    const hashedPassword = await encryptPassword(password);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Return success response
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Sign up error:", error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = signUp;
