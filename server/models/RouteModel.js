const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  Image: { type: String },
  Title: { type: String, required: true },
  Name: { type: String, required: true },
  Link: { type: String, required: true , unique: true  },
  Details: { type: String },
  Permission: { type: String, enum: ['show', 'no-show', 'read', 'download'], required: true }
});

const routeSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  view: { type: String, required: true },
  data: { type: Map, of: itemSchema }
}, { timestamps: true });

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
