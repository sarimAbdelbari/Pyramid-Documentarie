const mongoose = require('mongoose');
const Route = require('../models/RouteModel');
const Groop = require('../models/GroopModel');


// Helper function to convert string IDs to ObjectId
const normalizeObjectIds = (ids) => {
  console.log("Original IDs: ", ids);
  return ids.map(id => {
    try {
      return (typeof id === 'string' ? mongoose.Types.ObjectId(id) : id);
    } catch (error) {
      console.error(`Invalid ID format: ${id}`);
      return id; // Return the ID as is if it cannot be converted (for further debugging)
    }
  });
};


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

// Recursive function to get all child routes of a given route
const getAllRouteChildren = async (routeId) => {
  let routes = await Route.find({ parrentPath: routeId });
  
  for (const route of routes) {
    const children = await getAllRouteChildren(route._id); // Recursive call to get children of each child route
    routes.push(...children); // Add all children recursively to the array
  }

  return routes.map(route => route._id); // Return an array of route IDs
};


const deleteRouteById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the route with the given id
    const route = await Route.findById(id);
    if (!route) {
      return res.status(404).json({ message: 'Aucun route trouvé' });
    }

    // Get all the child routes (recursively) including the parent route
    let allRouteIds = await getAllRouteChildren(id);
    allRouteIds.push(id); // Include the parent route itself

    console.log("All Route IDs before normalization: ", allRouteIds);

    // Ensure all route IDs are ObjectId instances
    let allRoutesIds = normalizeObjectIds(allRouteIds);

    console.log("Normalized Route IDs: ", allRoutesIds);
    
    // Remove these routes from all groups
    await Groop.updateMany(
      { 'groopRoutes.route': { $in: allRoutesIds } }, // Use the normalized array here
      { $pull: { groopRoutes: { route: { $in: allRoutesIds } } } } // Use the normalized array here
    );

    console.log("Routes successfully removed from groups.");

    // Recursive function to delete a route and its children
    const deleteRouteAndChildren = async (routeId) => {
      const childRoutes = await Route.find({ parrentPath: routeId });

      for (const childRoute of childRoutes) {
        await deleteRouteAndChildren(childRoute._id);
      }

      await Route.findByIdAndDelete(routeId); // Delete the route itself
    };

    // Start the recursive deletion process for the selected route
    await deleteRouteAndChildren(id);

    res.status(200).json({ message: 'Route et ses enfants ont été supprimés avec succès' });
  } catch (error) {
    res.status(500).json({ message: `Erreur lors de la suppression route: ${error.message}` });
  }
};

// ? Get all feuilles with view = "PdfReader" or "ExcelReader"
const getFeuilles = async (req,res)=>{
  const views = ["PdfReader","ExcelReader"];

  try {
    const feuilles = await  Route.find({view:{$in:views}});
    if(!feuilles || feuilles.length ==0){
      res.status(404).json('no feuilles found')
    }
   res.status(200).json(feuilles);
  } catch (error) {
    res.status(500).json(error)
  }
}

// ? Get All Feuilles that Does Not contain view = "PdfReader" or "ExcelReader"
const getFeuillesNot = async (req,res)=>{
  const views = ["PdfReader","ExcelReader"];

  try {
    const feuilles = await  Route.find({view:{$nin:views}});
    if(!feuilles || feuilles.length ==0){
      res.status(404).json('no feuilles found')
    }
   res.status(200).json(feuilles);
  } catch (error) {
    res.status(500).json(error)
  }
}


module.exports = {
  createRoute,
  getRoutes,
  getRouteById,
  getRouteByManyId,
  getRouteByParrentId,
  updateRouteById,
  getFeuilles,
  getFeuillesNot,
  deleteRouteById
};


