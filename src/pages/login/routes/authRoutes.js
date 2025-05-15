import express from 'express';
import bcrypt from 'bcrypt';
import User from '../../signup/User.js';
import PasswordResetToken from '../PasswordResetToken.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Forgot password route
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User with this email does not exist' });
    }
    
    // Generate reset token
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedToken = await bcrypt.hash(resetToken, 10);
    
    // Save token to database
    await PasswordResetToken.findOneAndDelete({ userId: user._id });
    await PasswordResetToken.create({
      userId: user._id,
      email: user.email,
      token: hashedToken
    });
    
    // Send email
    const mailOptions = {
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Password Reset Code',
      html: `
        <h2>Password Reset Request</h2>
        <p>You requested a password reset for your account.</p>
        <p>Your verification code is: <strong>${resetToken}</strong></p>
        <p>This code will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      message: 'Password reset code has been sent to your email',
      success: true 
    });
    
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ 
      message: 'Error processing your request',
      error: error.message 
    });
  }
});

// Reset password route
router.post('/reset-password', async (req, res) => {
  try {
    const { email, resetCode, newPassword } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const resetToken = await PasswordResetToken.findOne({ userId: user._id });
    if (!resetToken) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }
    
    const isValidToken = await bcrypt.compare(resetCode, resetToken.token);
    if (!isValidToken) {
      return res.status(400).json({ message: 'Invalid reset code' });
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    
    await PasswordResetToken.findByIdAndDelete(resetToken._id);
    
    res.status(200).json({ 
      message: 'Password has been reset successfully', 
      success: true 
    });
    
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ 
      message: 'Error resetting password',
      error: error.message 
    });
  }
});

export default router;