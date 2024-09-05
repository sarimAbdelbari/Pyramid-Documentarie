const Route = require('../models/RouteModel');

// Create a new route

const createRoute = async (req, res) => {
  try {
    const {parrentPath ,title, path, view, image ,file, expiredate ,details ,data } = req.body;

    const existingRoute = await Route.findOne({ path });
    if (existingRoute) {
      return res.status(400).json({ message: 'Route avec ce chemin existe déjà' });
    }
    
    const newRoute = new Route({parrentPath, title, path, view, image ,file, expiredate , details ,data});

    await newRoute.save();

    res.status(201).json(newRoute);
    
  } catch (error) {
    res.status(500).json({ message: `Erreur lors de la création route: ${error.message}` });
  }
};

// Get all routes

const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ message: `Erreur lors de la récupération routes: ${error.message}` });
  }
};

// Get a single route by ID
const getRouteById = async (req, res) => {
  try {
    const { id } = req.params;
    const route = await Route.findById(id);
    if (!route) {
      return res.status(404).json({ message: 'Route non trouvé' });
    }
    res.status(200).json(route);
  } catch (error) {
    res.status(500).json({ message: `Erreur lors de la récupération route: ${error.message}` });
  }
};

const getRouteByManyId = async (req, res) => {
  try {
    const { ids } = req.body; // Assuming you send an array of IDs in the request body

    // Check if ids array is provided
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: 'Invalid or missing "ids" array in the request body.' });
    }

    // Use the $in operator to find routes with any of the given IDs
    const routes = await Route.find({ _id: { $in: ids } });

    if (routes.length === 0) {
      return res.status(404).json({ message: 'No routes found with the provided IDs.' });
    }

    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving routes: ${error.message}` });
  }
};


const getRouteByParrentId = async (req, res) => {
  try {
    const { parrentPath } = req.params;

    // Validate if parrentPath is provided
    if (!parrentPath) {
      return res.status(400).json({ message: 'Le paramètre parentPath est obligatoire' });
    }

    // Find all routes with the specified parrentPath
    const routes = await Route.find({ parrentPath });

    // Check if any routes are found
    if (routes.length === 0) {
      return res.status(204).json({ message: 'Aucun route trouvé avec le parentPath fourni' });
    }

    // Return the found routes
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ message: `Erreur lors de la récupération routes: ${error.message}` });
  }
};



// Update a route by ID
const updateRouteById = async (req, res) => {
  try {
    const { id } = req.params;
    const {parrentPath , title , path , view ,  image ,file, expiredate, details ,data} = req.body;
    const route = await Route.findByIdAndUpdate(id, {parrentPath , title, path, view,  image ,file , expiredate, details ,data }, { new: true });
    if (!route) {
      return res.status(404).json({ message: 'Aucun route trouvé' });
    }
    res.status(200).json(route);
  } catch (error) {
    res.status(500).json({ message: `Erreur lors de la mise à jour route: ${error.message}` });
  }
};

// Delete a route by ID
const deleteRouteById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the route with the given id
    const route = await Route.findById(id);
    if (!route) {
      return res.status(404).json({ message: 'Aucun route trouvé' });
    }

    // Recursive function to delete a route and its children
    const deleteRouteAndChildren = async (routeId) => {
      // Find all child routes
      const childRoutes = await Route.find({ parrentPath: routeId });

      // Recursively delete each child route and its children
      for (const childRoute of childRoutes) {
        await deleteRouteAndChildren(childRoute._id);
      }

      // Finally, delete the route itself
      await Route.findByIdAndDelete(routeId);
    };

    // Start the recursive deletion with the selected route
    await deleteRouteAndChildren(id);

    res.status(200).json({ message: 'Route et ses enfants ont été supprimés avec succès' });
  } catch (error) {
    res.status(500).json({ message: `Erreur lors de la suppression route: ${error.message}` });
  }
};




module.exports = {
  createRoute,
  getRoutes,
  getRouteById,
  getRouteByManyId,
  getRouteByParrentId,
  updateRouteById,
  deleteRouteById
};


