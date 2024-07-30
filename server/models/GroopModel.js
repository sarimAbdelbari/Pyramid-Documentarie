const mongoose = require('mongoose');

const groopSchema = new mongoose.Schema({
  groopName: { type: String, required: true ,unique: true},
  route: { type: String, required: true },
  permission: { 
    type: [String], 
    required: true 
  }
}, {timestamps : true});

const Groop = mongoose.model('Groop', groopSchema);

module.exports = Groop;
