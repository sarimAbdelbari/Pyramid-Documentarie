const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  parrentPath: { type: String},
  title: { type: String, required: true },
  path: { type: String, required: true, unique: true }, // Only `path` is unique
  view: { type: String, required: true },
  image: { type: String},
  file: { type: String},
  expiredate: { type: String}, 
  details: { type: String},
  file: { type: String },
  data: { type: Object },
}, { timestamps: true });

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
