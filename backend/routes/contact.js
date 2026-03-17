const express = require('express');
const router = express.Router();
const { submitContact, getContacts } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');
const { validateContact } = require('../middleware/validate');

// Public — submit a new message (validateContact runs before controller)
router.post('/', validateContact, submitContact);

// Protected — admin only: get all messages
router.get('/', protect, getContacts);

module.exports = router;
