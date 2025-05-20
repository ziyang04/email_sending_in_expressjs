const nodemailer = require('nodemailer');
require('dotenv').config();

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Send email to seller with buyer contact details
 * @param {string} sellerEmail - Email address of the seller
 * @param {string} buyerEmail - Email address of the buyer
 * @param {string} buyerPhone - Phone number of the buyer
 * @param {string} productName - Name of the product
 * @returns {Promise} - Nodemailer response
 */
const sendContactEmail = async (sellerEmail, buyerEmail, buyerPhone, productName) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: sellerEmail,
      subject: `New interest in your listing: ${productName}`,
      html: `
        <h2>Someone is interested in your product!</h2>
        <p>A buyer has shown interest in your listing: <strong>${productName}</strong></p>
        <h3>Buyer's Contact Details:</h3>
        <p>Email: ${buyerEmail}</p>
        <p>Phone: ${buyerPhone}</p>
        <br>
        <p>Please reach out to them to complete the transaction.</p>
        <p>Thank you for using our marketplace!</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = {
  sendContactEmail
};