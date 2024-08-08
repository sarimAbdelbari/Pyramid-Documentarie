const Route = require('../models/RouteModel');

// Create a new route

const createRoute = async (req, res) => {
  try {
    const { path, view, data } = req.body;

    const existingRoute = await Route.findOne({ path });
    if (existingRoute) {
      return res.status(400).json({ message: 'Route with this path already exists' });
    }

    const newRoute = new Route({ path, view, data });
    await newRoute.save();
    res.status(201).json(newRoute);
  } catch (error) {
    res.status(500).json({ message: `Error creating route: ${error.message}` });
  }
};

// Get all routes

const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ message: `Error fetching routes: ${error.message}` });
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
    res.status(500).json({ message: `Error fetching route: ${error.message}` });
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
    res.status(500).json({ message: `Error updating route: ${error.message}` });
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
    res.status(500).json({ message: `Error deleting route: ${error.message}` });
  }
};


// Delete a specific item from the data field by item _id
const deleteItemById = async (req, res) => {
  try {
    const { routeId, itemId } = req.params;

    // Find the route by its ID
    const route = await Route.findById(routeId);
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    // Find the item in the data map and delete it
    const data = route.data;
    let itemFound = false;

    data.forEach((value, key) => {
      if (value._id.toString() === itemId) {
        data.delete(key);
        itemFound = true;
      }
    });

    if (!itemFound) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Save the updated route
    await route.save();
    res.status(200).json({ message: 'Item deleted', data: route.data });
  } catch (error) {
    res.status(500).json({ message: `Error deleting item: ${error.message}` });
  }
};

module.exports = {
  createRoute,
  getRoutes,
  getRouteById,
  updateRouteById,
  deleteRouteById,
  deleteItemById 
};


