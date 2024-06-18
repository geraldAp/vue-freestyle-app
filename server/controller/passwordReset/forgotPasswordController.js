const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../model/user');
const { transporter } = require('../../helpers/transporter');

const ResetPasswordLink = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Found user :', user)

    const resetToken =  jwt.sign({ userId: user._id }, process.env.VERIFICATION_TOKEN_SECRET, { expiresIn: '1h' });

    const resetLink = `http://localhost:8080/api/reset-password/forgot-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p><a href="${resetLink}">Reset Password</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
      }
      return res.status(200).json({ message: 'Password reset email sent' ,resetToken});
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(500).json({ message: 'An error occurred while sending the password reset email' });
  }
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.VERIFICATION_TOKEN_SECRET);
    console.log('Decoded user Id',decoded.userId)
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { ResetPasswordLink, resetPassword };
