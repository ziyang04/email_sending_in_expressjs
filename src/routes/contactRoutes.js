const express = require('express');
const contactController = require('../controllers/contactController');

const router = express.Router();

/**
 * @route POST /api/contact
 * @desc Send contact information to a seller
 * @access Public
 */
router.post('/contact', contactController.contactSeller);

module.exports = router;