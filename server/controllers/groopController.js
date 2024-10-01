const Groop = require('../models/GroopModel');
const User = require('../models/UserModel');
const Route=require('../models/RouteModel');

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

// Create a new Groop
const createGroop = async (req, res) => {
  try {

    const { groopName, groopUsers, groopRoutes } = req.body;

    // Create and save the new group
    const parents = await Promise.all(
      groopRoutes.map(async (route) => {
        const routes = await getParents(route.route);
        return routes;
      })
    );
   
    const uniqueParents = Array.from(
      new Map(parents.flat().map(parent => [parent._id.toString(), parent])).values()
    );

    let newRoutes = uniqueParents.map((route)=>{
      return {
        "route":route._id.toString(),
        "permission":"NoDownload",
      }
    });

    newRoutes.push(groopRoutes);

   const finalRoutes=newRoutes.flat();
    const newGroop = new Groop({ groopName, groopUsers, groopRoutes:finalRoutes });
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

    // Find the existing group
    const existingGroop = await Groop.findById(req.params.id);
    if (!existingGroop) return res.status(404).json({ error: 'Group not found' });

    // Get the previous list of users in the group
    const previousUsers = existingGroop.groopUsers.map(user => user.toString()); // Convert to string for easy comparison

    // Handle updating routes with parent routes
    const parents = await Promise.all(
      groopRoutes.map(async (route) => {
        const routes = await getParents(route.route);
        return routes;
      })
    );

    const uniqueParents = Array.from(
      new Map(parents.flat().map(parent => [parent._id.toString(), parent])).values()
    );

    let updatedRoutes = uniqueParents.map((route) => {
      return {
        "route": route._id.toString(),
        "permission": "NoDownload",  // Set default permission for parents
      };
    });

    // Add provided routes with permissions
    updatedRoutes.push(groopRoutes);
    const finalRoutes = updatedRoutes.flat();

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
