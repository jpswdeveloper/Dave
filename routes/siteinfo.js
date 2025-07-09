const express = require('express');
const SiteInfo = require('../models/SiteInfo');
const auth = require('../middleware/auth');

const router = express.Router();

// Create site info
router.post('/', auth, async (req, res) => {
  const { siteId, azimute, electricalTilt, mechanicalTilt, antennaHeight } = req.body;
  try {
    const info = new SiteInfo({ siteId, azimute, electricalTilt, mechanicalTilt, antennaHeight });
    await info.save();
    res.status(201).json(info);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all site info
router.get('/', auth, async (req, res) => {
  try {
    const infos = await SiteInfo.find();
    res.json(infos);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single site info by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const info = await SiteInfo.findById(req.params.id);
    if (!info) return res.status(404).json({ message: 'Not found' });
    res.json(info);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update site info by ID
router.put('/:id', auth, async (req, res) => {
  const { siteId, azimute, electricalTilt, mechanicalTilt, antennaHeight } = req.body;
  try {
    const info = await SiteInfo.findByIdAndUpdate(
      req.params.id,
      { siteId, azimute, electricalTilt, mechanicalTilt, antennaHeight },
      { new: true }
    );
    if (!info) return res.status(404).json({ message: 'Not found' });
    res.json(info);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete site info by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    const info = await SiteInfo.findByIdAndDelete(req.params.id);
    if (!info) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 