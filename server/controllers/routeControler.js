const Route = require('../models/RouteModel');

// Create a new route

const createRoute = async (req, res) => {
  try {
    const {parrentPath ,title, path, view, image ,file, expiredate ,details ,data } = req.body;

    const existingRoute = await Route.findOne({ path });
    if (existingRoute) {
      return res.status(400).json({ message: 'Route with this path already exists' });
    }

    const newRoute = new Route({parrentPath, title, path, view, image ,file, expiredate , details ,data});
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

const getRouteByParrentId = async (req, res) => {
  try {
    const { parrentPath } = req.params;

    // Validate if parrentPath is provided
    if (!parrentPath) {
      return res.status(400).json({ message: 'parrentPath parameter is required' });
    }

    // Find all routes with the specified parrentPath
    const routes = await Route.find({ parrentPath });

    // Check if any routes are found
    if (routes.length === 0) {
      return res.status(204).json({ message: 'No routes found with the provided parrentPath' });
    }

    // Return the found routes
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ message: `Error fetching routes: ${error.message}` });
  }
};



// Update a route by ID
const updateRouteById = async (req, res) => {
  try {
    const { id } = req.params;
    const {parrentPath , title , path , view ,  image ,file, expiredate, details ,data} = req.body;
    const route = await Route.findByIdAndUpdate(id, {parrentPath , title, path, view,  image ,file , expiredate, details ,data }, { new: true });
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

    // Find the route with the given id
    const route = await Route.findById(id);
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    // Delete all routes that have this route as their parent
    await Route.deleteMany({ parrentPath: id });

    // Now delete the route itself
    await Route.findByIdAndDelete(id);

    res.status(200).json({ message: 'Route and its children deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: `Error deleting route: ${error.message}` });
  }
};




module.exports = {
  createRoute,
  getRoutes,
  getRouteById,
  getRouteByParrentId,
  updateRouteById,
  deleteRouteById
};


