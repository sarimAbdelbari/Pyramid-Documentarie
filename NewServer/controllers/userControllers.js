const User = require("../models/UserModel");
const Groop = require("../models/GroopModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");

// * Create A new User
const createUser = async (req, res) => {
  try {
    const { userName, email, password, groop, active, admin } = req.body;

    if (!email || !password || !userName || !groop) {
      throw Error("All fields must be filled");
    }

    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough");
    }

    const existUserName = await User.findOne({ userName });
    if (existUserName) {
      throw Error("UserName already in use");
    }
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      throw Error("Email already in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // ? add a user to the groop
    const assignedAt = new Date();
    const newGroups = groop.map((groop) => {
      if (!groop.timer) {
        return {
          groop: groop.groop,
          assignedAt: assignedAt,
        };
      } else {
        return {
          groop: groop.groop,
          timer: groop.timer * 60,
          assignedAt: assignedAt,
        };
      }
    });
    const newUser = new User({
      userName,
      email,
      password: hash,
      groop:newGroups,
      active,
      admin,
    });
    const groopIds = groop.map((group) => group.groop);
    const groopOfUser = await Groop.find({ _id: { $in: groopIds } });
    if (!groopOfUser || groopOfUser.length === 0) {
      throw Error("Groop not found");
    }
    // Add the new user to each group's `groopUsers`
    groopOfUser.forEach((group) => {
      group.groopUsers.push(newUser._id);
      group.save(); // Save each updated group document
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// * Get All Users

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// * Get A Single User
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ message: "id Not found" });
  }
  try {
    const user = await User.findById(id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
    const groups = user.groop;
    const toDay = new Date();
    const expiredGroups = groups.filter((group) => {
      if (group.assignedAt && group.timer) {
        const assignedAtDate = new Date(group.assignedAt);
        const expirationDate = new Date(
          assignedAtDate.getTime() + group.timer * 60 * 1000
        );
        return toDay >= expirationDate;
      }
      return false;
    });
    const updateGroopsPromises = expiredGroups.map(async (expiredGroup) => {
      return await Groop.updateOne(
        { _id: expiredGroup.groop },
        {
          $pull: { groopUsers: id },
        }
      );
    });
    await Promise.all(updateGroopsPromises);
    const promises = expiredGroups.map(async (expiredGroup) => {
      return await User.updateOne(
        { _id: id },
        {
          $pull: { groop: { groop: expiredGroup.groop } },
        }
      ).populate("groop");
    });
    // Await all the update promises
    await Promise.all(promises);
    const userUpdated = await User.findById(id);
    if (userUpdated == null) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(userUpdated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// * update A User
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { userName, email, password, groop, active, admin } = req.body;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
   
    // Update user details
    if (userName && userName !== user.userName) user.userName = userName;
    if (email && email !== user.email) user.email = email;
     
    // Check if the password is different before hashing it
    if (
      password &&
      password !== user.password &&
      !(await bcrypt.compare(password, user.password))
    ) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
   
    if (groop && groop !== user.groop) {
    const newGroopIds=groop.map((groop)=>groop.groop);
    console.log(newGroopIds)
   // Store the old group memberships
    const oldGroops = user.groop.map((g) => g.groop.toString()); // Convert ObjectIds to strings
    const groupsToRemove = oldGroops.filter((g) => !newGroopIds.includes(g));
    if (groupsToRemove.length > 0) {
      await Groop.updateMany(
        { _id: { $in: groupsToRemove } },
        { $pull: { groopUsers: user._id } }
      );
    }
    // 2. Add user to new groups not already in old groops
    const groupsToAdd = newGroopIds.filter((g) => !oldGroops.includes(g));
    if (groupsToAdd.length > 0) {
      await Groop.updateMany(
        { _id: { $in: groupsToAdd } },
        { $addToSet: { groopUsers: user._id } }
      );
    }
    const assignedAt= new Date();
    const newGroups = groop.map((groop) => {
      if (!groop.timer) {
        return {
          groop: groop.groop,
          assignedAt: assignedAt,
        };
      } else {
        return {
          groop: groop.groop,
          timer: groop.timer * 60,
          assignedAt: assignedAt,
        };
      }
    });
    user.groop = newGroups;
    }
    // Check if active is different from user.active
    if (active !== user.active) {
      // Update user.active
      user.active = active;
    }
    if (admin !== user.admin) {
      // Update user.admin
      user.admin = admin;
    }
    
    // Save the updated user
    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// * delete A User

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user to be deleted
    const user = await User.findById(id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the user from all groops they belong to
    await Groop.updateMany(
      { groopUsers: user._id }, // Find all groops that include the user
      { $pull: { groopUsers: user._id } } // Remove the user from groopUsers array
    );

    // Delete the user
    await User.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: "User deleted and removed from all groops" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// const updateManyUsers = async (req, res) => {

//   const { ids, groopName } = req.body;

//   if (!Array.isArray(ids) || !groopName) {
//       return res.status(400).json({ message: 'Invalid input data' });
//   }

//   try {
//       const result = await User.updateMany(
//           { _id: { $in: ids } },
//           { $set: { groop: groopName } }
//       );

//       res.status(200).json({ message: 'Users updated successfully', result });
//   } catch (error) {
//       console.error("Error updating users:", error);
//       res.status(500).json({ message: 'Error updating users', error: error.message });
//   }
// };
// ;

const getTopUsers = async (req, res) => {
  try {
    const { offset = 0 } = req.body; // Set default offset to 0 if not provided
    const users = await User.find({}).populate("groop.groop");
    const newUsers = await Promise.all(
      users.map(async (user) => {
        if (user.groop && user.groop.length != 0) {
          const routes = await Promise.all(
            user.groop.map(async (groop) => {
              const grp = await Groop.findOne({ _id: groop.groop });
              if (grp && grp.groopRoutes && grp.groopRoutes.length != 0) {
                return grp.groopRoutes;
              }
              return [];
            })
          );
          // Flatten the routes array
          const flatRoutes = routes.flat();
          const uniqueRoutes = flatRoutes.filter(
            (route, index, self) =>
              index === self.findIndex((r) => r.route.toString() === route.route.toString())
          );
          return {
            user: user._id,
            "routes count": uniqueRoutes.length,
          };
        }
        return {
          user: user._id,
          "routes count": 0,
        };
      })
    );
    // Sort newUsers by "routes count"
    newUsers.sort((a, b) => b["routes count"] - a["routes count"]);
    // Get max 10 users starting from the offset
    const paginatedUsers = newUsers.slice(offset, offset + 10);
    res.status(200).json(paginatedUsers);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  getUser,
  getTopUsers,
};
