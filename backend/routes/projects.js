const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ featured: -1, order: 1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
