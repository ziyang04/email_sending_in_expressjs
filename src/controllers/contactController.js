const emailService = require('../services/emailService');

/**
 * Handle request to send contact information to seller
 */
const contactSeller = async (req, res) => {
  try {
    const { sellerEmail, buyerEmail, buyerPhone, productName } = req.body;
    
    // Validate input
    if (!sellerEmail || !buyerEmail || !buyerPhone || !productName) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: sellerEmail, buyerEmail, buyerPhone, and productName are required'
      });
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sellerEmail) || !emailRegex.test(buyerEmail)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format'
      });
    }

    // Send email to seller
    const result = await emailService.sendContactEmail(
      sellerEmail,
      buyerEmail,
      buyerPhone,
      productName
    );

    res.status(200).json({
      success: true,
      message: 'Contact information sent to seller successfully',
      data: result
    });
  } catch (error) {
    console.error('Error in contactSeller controller:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send contact information',
      error: error.message
    });
  }
};

module.exports = {
  contactSeller
};