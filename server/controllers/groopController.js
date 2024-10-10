const Groop = require('../models/GroopModel');
const User = require('../models/UserModel');
const Route=require('../models/RouteModel');
const mongoose = require('mongoose');

// Get All the Parrent
const getParents = async (routeId) => {
  const route = await Route.findOne({ _id: routeId });
  if (!route) {
    return [];
  }
  let parents = [];
  let currentRoute = route;
  while (currentRoute.parrentPath!="") {
    const parentRoute = await Route.findOne({ _id: currentRoute.parrentPath });
    if (!parentRoute) {
      break; 
    }
    parents.push(parentRoute);
    currentRoute = parentRoute;
  }
  return parents;
};

// Get all The Children
const getAllRouteChildren = async (routeId) => {
  let routes = await Route.find({ parrentPath: routeId });

  for (const route of routes) {
    const children = await getAllRouteChildren(route._id); // Recursive call to get children of each child route
    routes.push(...children); // Add all children recursively to the array
  }

  return routes.map(route => route._id); // Return an array of route IDs

};


// Helper function to normalize ObjectIds or strings
const normalizeObjectIds = (ids) => {
  return ids.map(id => {
    try {
      // If the id is an ObjectId, convert it to a string
      if (id instanceof mongoose.Types.ObjectId) {
        return id.toString();
      }

      // If the id is a string, return it as it is
      return id;

    } catch (error) {
      console.error(`Invalid ID format: ${id}`);
      return id; // Return the ID as is if it cannot be converted (for further debugging)
    }
  });
};

// Create a new Groop
const createGroop = async (req, res) => {
  try {
    const { groopName, groopUsers, groopRoutes } = req.body;


    // Filter the groopRoutes where route type is 'page'
    const filteredRoutes = groopRoutes.filter(route => route.type === 'page').map(route => route.route);

    // Fetch children of the filtered routes
    const children = await getAllRouteChildren(filteredRoutes);

    const populatedChildren = await Route.find({ _id: { $in: children } });

    // Filter the children where view is 'PdfReader' or 'ExcelReader'
    const filteredChildren = populatedChildren.filter(route => route.view === 'PdfReader' || route.view === 'ExcelReader').map(route => route._id);

    // Normalize the children to ensure all are strings
    const normalizedChildren = await normalizeObjectIds(filteredChildren);
    
 
    // Combine filtered routes and normalized children into a single array
    const allChildren = [...groopRoutes.filter(route => route.type === 'file').map(route => route.route), ...normalizedChildren];



    // Continue processing parents and saving group
    const parents = await Promise.all(
      allChildren.map(async (route) => {
        const routes = await getParents(route);
        return routes;
      })
    );

   
   const uniqueParents = Array.from(
     new Map(parents.flat().map(parent => [parent._id.toString(), parent])).values()
    );

    let newRoutes = [...allChildren.map((route) => ({ "route": route.toString(), "permission": "NoDownload" })),...uniqueParents.map((route) => {
      return {
        "route": route._id.toString(),
        "permission": "NoDownload",
      };
    })]
 
  

    const finalRoutes = newRoutes.flat();

    // Uncomment to save the new group
    const newGroop = new Groop({ groopName, groopUsers, groopRoutes: finalRoutes });
    const savedGroop = await newGroop.save();
    await User.updateMany(
      { _id: { $in: groopUsers } },
      { $addToSet: { groop: savedGroop._id } }  // $addToSet prevents duplicate group entries
    );

    res.status(201).json({ message: 'Group created and users updated successfully', savedGroop });

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

    if (!groupsIds || !Array.isArray(groupsIds) || groupsIds.length === 0) {
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
    const { groopName, groopUsers, groopRoutes } = req.body;


   console.log("groopRoutes" ,groopRoutes);

    // Find the existing group
    const existingGroop = await Groop.findById(req.params.id);
    if (!existingGroop) return res.status(404).json({ error: 'Group not found' });

    // Get the previous list of users in the group
    const previousUsers = existingGroop.groopUsers.map(user => user.toString()); // Convert to string for easy comparison


   // Filter the groopRoutes where route type is 'page'
   const filteredRoutes = groopRoutes.filter(route => route.type === 'page').map(route => route.route);

   // Fetch children of the filtered routes
   const children = await getAllRouteChildren(filteredRoutes);

   const populatedChildren = await Route.find({ _id: { $in: children } });

   // Filter the children where view is 'PdfReader' or 'ExcelReader'
   const filteredChildren = populatedChildren.filter(route => route.view === 'PdfReader' || route.view === 'ExcelReader').map(route => route._id);

   // Normalize the children to ensure all are strings
   const normalizedChildren = await normalizeObjectIds(filteredChildren);
   

   // Combine filtered routes and normalized children into a single array
   const allChildren = [...groopRoutes.filter(route => route.type === 'file').map(route => route.route), ...normalizedChildren];



   // Continue processing parents and saving group
   const parents = await Promise.all(
     allChildren.map(async (route) => {
       const routes = await getParents(route);
       return routes;
     })
   );

  const uniqueParents = Array.from(
    new Map(parents.flat().map(parent => [parent._id.toString(), parent])).values()
   );

   let newRoutes = [...allChildren.map((route) => ({ "route": route.toString(), "permission": "NoDownload" })),...uniqueParents.map((route) => {
    return {
      "route": route._id.toString(),
      "permission": "NoDownload",
    };
  })]



  const finalRoutes = newRoutes.flat();






    // Update group details (name, routes, users)
    existingGroop.groopName = groopName || existingGroop.groopName;
    existingGroop.groopRoutes = finalRoutes || existingGroop.groopRoutes;
    existingGroop.groopUsers = groopUsers || existingGroop.groopUsers;

    // Save the updated group
    const updatedGroop = await existingGroop.save();

    // Handle user additions and removals
    const usersToAdd = groopUsers.filter(user => !previousUsers.includes(user));
    const usersToRemove = previousUsers.filter(user => !groopUsers.includes(user));

    // Add group to new users
    await User.updateMany(
      { _id: { $in: usersToAdd } },
      { $addToSet: { groop: updatedGroop._id } }
    );

    // Remove group from removed users
    await User.updateMany(
      { _id: { $in: usersToRemove } },
      { $pull: { groop: updatedGroop._id } }
    );

    res.status(200).json({ message: 'Group updated successfully', updatedGroop });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



// Delete a Groop by ID
const deleteGroop = async (req, res) => {
  try {
    // Find and delete the group by ID
    const deletedGroop = await Groop.findByIdAndDelete(req.params.id);
    if (!deletedGroop) return res.status(404).json({ error: 'Group not found' });

    // Remove the group from all users' groop arrays
    await User.updateMany(
      { groop: req.params.id },
      { $pull: { groop: req.params.id } }  // Use $pull to remove the group from users
    );

    res.status(200).json({ message: 'Group deleted successfully' });
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
