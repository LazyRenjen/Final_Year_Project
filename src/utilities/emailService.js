import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create a transporter object using SMTP transport
let transporter;
try {
  transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail', // Default to gmail if not specified
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
} catch (error) {
  console.error('Failed to create email transporter:', error);
}

/**
 * Sends a password reset email with verification code
 * @param {string} to - Recipient email
 * @param {string} resetCode - Password reset verification code
 * @param {string} username - User's name if available
 * @returns {Promise} - Email send promise
 */
export const sendPasswordResetEmail = async (to, resetCode, username = 'User') => {
  // Check if transporter was initialized successfully
  if (!transporter) {
    console.error('Email transporter not initialized. Check your email configuration.');
    throw new Error('Email service not configured properly');
  }

  const mailOptions = {
    from: `"Nepal Tourism" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #3f51b5;">Nepal Tourism - Password Reset</h2>
        <p>Hello ${username},</p>
        <p>We received a request to reset your password. Please use the following code to reset your password:</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
          <h3 style="margin: 0; font-size: 24px; letter-spacing: 2px;">${resetCode}</h3>
        </div>
        <p>This code will expire in 1 hour.</p>
        <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
        <p style="margin-top: 30px; font-size: 12px; color: #757575;">
          This is an automated email, please do not reply to this message.
        </p>
      </div>
    `
  };

  try {
    // Verify connection configuration
    await transporter.verify();
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email: ' + (error.message || 'Unknown error'));
  }
};

export default {
  sendPasswordResetEmail
};