const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  parrentPath: {type: String, required: true, unique: true },
  title: { type: String, required: true },
  path: { type: String, required: true, unique: true },
  view: { type: String, required: true },
  image: { type: String, required: true },
  details: { type: String, required: true },
  data: { type: Object },
}, { timestamps: true });

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
