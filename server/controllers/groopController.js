const Groop = require('../models/GroopModel');

// Create a new groop
const createGroop = async (req, res) => {
  try {
    const { groopName, route, permission } = req.body;
    const newGroop = new Groop({ groopName, route, permission });
    await newGroop.save();
    res.status(201).json(newGroop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all groops
const getGroops = async (req, res) => {
  try {
    const groops = await Groop.find();
    res.status(200).json(groops);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single groop by ID
const getGroopById = async (req, res) => {
  try {
    const { id } = req.params;
    const groop = await Groop.findById(id);
    if (!groop) {
      return res.status(404).json({ message: 'Groop not found' });
    }
    res.status(200).json(groop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a groop by ID
const updateGroopById = async (req, res) => {
  try {
    const { id } = req.params;
    const { groopName, route, permission } = req.body;
    const groop = await Groop.findByIdAndUpdate(id, { groopName, route, permission }, { new: true });
    if (!groop) {
      return res.status(404).json({ message: 'Groop not found' });
    }
    res.status(200).json(groop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a groop by ID
const deleteGroopById = async (req, res) => {
  try {
    const { id } = req.params;
    const groop = await Groop.findByIdAndDelete(id);
    if (!groop) {
      return res.status(404).json({ message: 'Groop not found' });
    }
    res.status(200).json({ message: 'Groop deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createGroop,
  getGroops,
  getGroopById,
  updateGroopById,
  deleteGroopById
};
