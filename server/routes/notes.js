const express = require('express');
const Note = require('../models/Note');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    
    // Build filter object based on query parameters
    const filter = {};
    if (category) {
      filter.category = category;
    }
    
    const notes = await Note.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(notes);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
