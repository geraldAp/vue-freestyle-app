const User = require("../../model/user");
const { comparePassword } = require("../../helpers/passwordHelpers");
const { encryptPassword } = require("../../helpers/passwordHelpers");

const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "This user does not exist" });
    }
    console.log("old Password:", user.password);
    console.log("New Password:", newPassword);
    const comparedPassword = await comparePassword(oldPassword, user.password);

    if (!comparedPassword) {
      return res.status(400).json({ message: "Old password is incorrect " });
    }
    const hashedPassword = await encryptPassword(newPassword);
    if (hashedPassword) {
      user.password = hashedPassword;
      await user.save();
    }
    res.status(201).json({ message: "Password updated successfully " });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { changePassword };
