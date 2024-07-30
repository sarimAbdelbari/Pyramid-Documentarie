const Route = require('../models/RouteModel');

// Create a new route
const createRoute = async (req, res) => {
  try {
    const { path, view, data } = req.body;
    const newRoute = new Route({ path, view, data });
    await newRoute.save();
    res.status(201).json(newRoute);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all routes
const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.status(200).json(routes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single route by ID
const getRouteById = async (req, res) => {
  try {
    const { id } = req.params;
    const route = await Route.findById(id);
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }
    res.status(200).json(route);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a route by ID
const updateRouteById = async (req, res) => {
  try {
    const { id } = req.params;
    const { path, view, data } = req.body;
    const route = await Route.findByIdAndUpdate(id, { path, view, data }, { new: true });
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }
    res.status(200).json(route);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a route by ID
const deleteRouteById = async (req, res) => {
  try {
    const { id } = req.params;
    const route = await Route.findByIdAndDelete(id);
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }
    res.status(200).json({ message: 'Route deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createRoute,
  getRoutes,
  getRouteById,
  updateRouteById,
  deleteRouteById
};
