const mongoose = require('mongoose');

const groopRouteSchema = new mongoose.Schema({
  route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
  permission: { 
    type: String, 
    required: true, 
    enum: ['Download', 'NoDownload'], // Restrict permission to 'Show' or 'noShow'
  },
});

const groopSchema = new mongoose.Schema({
  groopName: { type: String, required: true, unique: true },
  groopRoutes: [groopRouteSchema], // Array of routes with permissions
  groopUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs
}, { timestamps: true });

const Groop = mongoose.model('Groop', groopSchema);

module.exports = Groop;
