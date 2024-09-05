const Groop = require('../models/GroopModel');


// Create a new Groop
const createGroop = async (req, res) => {
  try {
    const { groopName, groopUsers, groopRoutes } = req.body;
    const newGroop = new Groop({ groopName, groopUsers, groopRoutes });
    const savedGroop = await newGroop.save();
    res.status(201).json(savedGroop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all Groops
const getAllGroops = async (req, res) => {
  try {
    const groops = await Groop.find()
      .populate('groopUsers')
      .populate('groopRoutes.route');
    res.status(200).json(groops);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const getGroupsByManyIds = async (req, res) => {
  try {

    const { groupsIds } = req.body;

    if (!groupsIds || !Array.isArray(groupsIds)) {
      return res.status(400).json({
        message: 'Invalid or missing "ids" array in the request body.',
      });
    }

    const groupPromises = groupsIds.map((id) => Groop.findById(id));

    const groups = await Promise.all(groupPromises);
    
    if (groups.length === 0) {
      return res
        .status(404)
        .json({ message: "No groups found with the provided IDs." });
    }

    res.status(200).json(groups);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error retrieving groups: ${error.message}` });
  }
};

// Get a single Groop by ID
const getGroopById = async (req, res) => {
  try {
    const groop = await Groop.findById(req.params.id)
      .populate('groopUsers')
      .populate('groopRoutes.route');
    if (!groop) return res.status(404).json({ error: 'Groupe non trouvé' });
    res.status(200).json(groop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a Groop by ID
const updateGroop = async (req, res) => {
  try {
    const updatedGroop = await Groop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('groopUsers')
      .populate('groopRoutes.route');
    if (!updatedGroop) return res.status(404).json({ error: 'Groupe non trouvé' });
    res.status(200).json(updatedGroop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a Groop by ID
const deleteGroop = async (req, res) => {
  try {
    const deletedGroop = await Groop.findByIdAndDelete(req.params.id);
    if (!deletedGroop) return res.status(404).json({ error: 'Groupe non trouvé' });
    res.status(200).json({ message: 'Groop a été supprimé avec succès' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createGroop,
  getAllGroops,
  getGroopById,
  getGroupsByManyIds,
  updateGroop,
  deleteGroop
};
