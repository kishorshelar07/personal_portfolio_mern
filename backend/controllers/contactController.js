const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const contact = await Contact.create({
      name,
      email,
      message,
      ipAddress: req.ip,
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
      id: contact._id,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: errors.join('. ') });
    }
    console.error('Contact error:', err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
