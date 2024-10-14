const Groop = require("../models/GroopModel");
const User = require("../models/UserModel");
const Route = require("../models/RouteModel");

const getUserStats = async () => {
  try {
    const users = await User.find({});
    
    let active = 0;
    let disActive = 0;
    let admins = 0;

    users.forEach((user) => {
      if (user.active) {
        active += 1;
      } else {
        disActive += 1;
      }

      if (user.admin) {
        admins += 1;
      }
    });

    return { // Instead of res.status(200)
      active,
      disActive,
      admins,
      totalUsers: users.length
    };
  } catch (error) {
    console.error('Error in getUserStats:', error);
    throw new Error('Failed to get user stats'); // Throw error instead of responding directly
  }
};


const getMostDistRoute = async () => {
  const routes = await Route.find({});

  if (!routes || routes.length == 0) {
    return " no routes available";
  }
  const promises = routes.map(async (route) => {
    const routeGroups = await Groop.find({ "groopRoutes.route": route._id });
    return {
      "route id": route._id,
      route: route.path,
      groups: routeGroups.length,
    };
  });
  const result = await Promise.all(promises);
  result.sort((a, b) => b["groups"] - a["groups"]);
  return result[0];
};


const getNumOfSpecificView = async (req, res) => {
  try {
    const { view } = req.body;
    const routes = await Route.find({ view: view });
    res.status(200).json(routes.length);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMostCommonGroop = async () => {
  try {
    const groopCounts = await User.aggregate([
      { $unwind: '$groop' },  // Unwind to get each group separately
      { $group: { _id: '$groop', count: { $sum: 1 } } },  // Group by groop and count occurrences
      { $sort: { count: -1 } },  // Sort by count in descending order
      { $limit: 1 }  // Get the top group (most common)
    ]);

    if (groopCounts.length === 0) {
      return null;  // No groups found
    }

    const mostCommonGroop = await Groop.findById(groopCounts[0]._id);

    if (!mostCommonGroop) {
      return null;  // Group not found
    }

    return {  // Return the result properly for Promise.all
      groop: mostCommonGroop,
      count: groopCounts[0].count
    };
  } catch (error) {
    console.error('Error in getMostCommonGroop:', error);
    throw new Error('Failed to get most common groop');
  }
};


const getGeneralStatistics = async (req, res) => {
  try {
    const [stat, mostDistRoute, mostCommonGroopResult] = await Promise.all([
      getUserStats(),  // Will now return an object, not respond
      getMostDistRoute(), // Properly resolved result
      getMostCommonGroop(), // Properly resolved result
    ]);

    res.status(200).json({
      active: stat.active,
      disActive: stat.disActive,
      admins: stat.admins,
      most_distributed_route: mostDistRoute,
      most_common_groop: mostCommonGroopResult ? mostCommonGroopResult.groop : null,
      numberOftheMostCommunGroop: mostCommonGroopResult ? mostCommonGroopResult.count : 0
    });
  } catch (error) {
    console.error("Error in getGeneralStatistics:", error);  // Log the full error details for debugging
    res.status(500).json({ message: 'Something went wrong', error: error.message || error });
  }
};



module.exports = {
  getGeneralStatistics,
  getNumOfSpecificView
};
