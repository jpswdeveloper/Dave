const mongoose = require('mongoose');

const siteInfoSchema = new mongoose.Schema({
  siteId: { type: String, required: true },
  azimute: { type: String, required: true },
  electricalTilt: { type: String, required: true },
  mechanicalTilt: { type: String, required: true },
  antennaHeight: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  editedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('SiteInfo', siteInfoSchema); 