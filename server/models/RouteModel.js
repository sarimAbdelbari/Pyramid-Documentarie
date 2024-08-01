const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  path: { type: String, required: true , unique: true},
  view: { type: String, required: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true }
}, {timestamps : true});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
