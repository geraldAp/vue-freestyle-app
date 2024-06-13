const fs = require("fs");
const path = require("path");
const User = require("../model/user");
const Verification = require("../model/verification");
const jwt = require("jsonwebtoken");
const { validateUserSignUpCredentials } = require("../helpers/validators");
const { encryptPassword } = require("../helpers/passwordHelpers");
const { transporter } = require("../helpers/transporter");
const signUp = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;

    // Validation
    const {
      firstName: validatedFirstName,
      lastName: validatedLastName,
      userName: validatedUserName,
      email: validatedEmail,
      password: validatedPassword,
    } = validateUserSignUpCredentials(
      firstName,
      lastName,
      userName,
      email,
      password
    );

    if (validatedFirstName.error) {
      console.error(
        "First Name validation error:",
        validatedFirstName.error.message
      );
      throw new Error(validatedFirstName.error.message);
    }
    if (validatedLastName.error) {
      console.error(
        "Last Name validation error:",
        validatedLastName.error.message
      );
      throw new Error(validatedLastName.error.message);
    }
    if (validatedUserName.error) {
      console.error(
        "User Name validation error:",
        validatedUserName.error.message
      );
      throw new Error(validatedUserName.error.message);
    }
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

    // Check if the user with this email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        message:
          "User with this email already exists, kindly login or choose another email",
      });
    }

    // Check if the username already exists
    const existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return res
        .status(400)
        .json({ message: "Username already taken, please choose another" });
    }

    // Hash password
    const hashedPassword = await encryptPassword(password);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();
    // setting up the verification system
    const verificationToken = jwt.sign(
      { userId: newUser._id },
      process.env.VERIFICATION_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    await Verification.create({
      userId: newUser._id,
      token: verificationToken,
    });

    const filePath = path.join(
      __dirname,
      "../views/verificationEmailTemplate.html"
    );

    const verificationLink = `http://localhost:8080/api/verification/verify-email?token=${verificationToken}`;
    fs.readFile(filePath, "utf8", async (err, html) => {
      const emailHtml = html.replace("{{verificationLink}}", verificationLink);
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Email Verification",
        html: emailHtml,
      };

      transporter.sendMail(mailOptions);

      // Return success response
      return res.status(201).json({
        message:
          "User created successfully. Please check your email to verify your account.",
      });
    });
  } catch (error) {
    console.error("Sign up error:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = signUp;
