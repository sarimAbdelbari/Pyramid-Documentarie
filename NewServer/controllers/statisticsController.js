const Groop = require("../models/GroopModel");
const User = require("../models/UserModel");
const Route = require("../models/RouteModel");

const getUserStats = async () => {
  const users = await User.find({});
  let active = 0;
  let disActive = 0;
  let admins = 0;
  users.map((user) => {
    if (user.active) {
      active = active + 1;
    } else {
      disActive = disActive + 1;
    }

    if (user.admin) {
      admins = admins + 1;
    }
  });

  return {
    active: active,
    disActive: disActive,
    admins: admins,
  };
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

const getGeneralStatistics = async (req, res) => {
  try {
    const [stat, mostDistRoute] = await Promise.all([
      getUserStats(),
      getMostDistRoute(),
    ]);

    res.status(200).json({
      active: stat.active,
      disActive: stat.disActive,
      admins: stat.admins,
      most_distributed_route: mostDistRoute,
    });
  } catch (error) {
    res.status(500).json(error);
  }
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
module.exports = {
  getGeneralStatistics,
  getNumOfSpecificView,
};
