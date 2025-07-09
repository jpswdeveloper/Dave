const mongoose = require('mongoose');

const siteInfoSchema = new mongoose.Schema({
  siteId: { type: Number, required: true },
  azimute: { type: Number, required: true },
  electricalTilt: { type: Number, required: true },
  mechanicalTilt: { type: Number, required: true },
  antennaHeight: { type: Number, required: true },
});

module.exports = mongoose.model('SiteInfo', siteInfoSchema); 