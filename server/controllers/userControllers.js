const User = require("../models/UserModel");
const Groop = require("../models/GroopModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");

// * Create A new User
const createUser = async (req, res) => {
  try {
    const { userName, email, password, groop , active , admin } = req.body;

    if (!email || !password || !userName ) {
      throw Error("Tous les champs doivent être remplis");
    }

    if (!validator.isEmail(email)) {
      throw Error("L'email n'est pas valide");
    }

    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enoughLe mot de passe n'est pas assez fort");
    }

    const existUserName = await User.findOne({ userName });

    if (existUserName) {
      throw Error("Nom d'utilisateur déjà utilisé");
    }

    const existEmail = await User.findOne({ email });

    if (existEmail) {
      throw Error("Email déjà utilisé");
    }

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);

    // ? add a user to the groop

    const newUser = new User({ userName, email, password: hash, groop , active , admin});

    const groopOfUser = await Groop.find({ _id: { $in: groop } });

    if (!groopOfUser || groopOfUser.length === 0) {
      throw Error("Groupe non trouvé");
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
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// * update A User

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { userName, email, password, groop , active ,admin } = req.body;

  if (!id) {
    return res.status(404).json({ message: "id Not found" });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Store the old group memberships
    const oldGroops = user.groop.map(g => g.toString());  // Convert ObjectIds to strings

    // Update user details

    if (userName && userName !== user.userName) user.userName = userName;
    if (email && email !== user.email) user.email = email;

    // Check if the password is different before hashing it
    if (password && password !== user.password &&  !(await bcrypt.compare(password, user.password))) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    if (groop && groop !== user.groop) {
      user.groop = groop;
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

    // Find the new groups for the user
    const newGroops = await Groop.find({ _id: { $in: groop } });

    if (newGroops.length === 0) {
      return res.status(400).json({ message: "No valid groops found" });
    }

    // Update groups
    // 1. Remove user from old groups not in the new groop list

    const groupsToRemove = oldGroops.filter(g => !groop.includes(g));
    
    if (groupsToRemove.length > 0) {
      await Groop.updateMany(
        { _id: { $in: groupsToRemove } },
        { $pull: { groopUsers: user._id } }
      );
    }

    // 2. Add user to new groups not already in old groops
    const groupsToAdd = groop.filter(g => !oldGroops.includes(g));
    if (groupsToAdd.length > 0) {
      await Groop.updateMany(
        { _id: { $in: groupsToAdd } },
        { $addToSet: { groopUsers: user._id } }
      );
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
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
  
      // Remove the user from all groops they belong to
      await Groop.updateMany(
        { groopUsers: user._id },  // Find all groops that include the user
        { $pull: { groopUsers: user._id } }  // Remove the user from groopUsers array
      );
  
      // Delete the user
      await User.findByIdAndDelete(id);
  
      res.status(200).json({ message: "Utilisateur supprimé et retiré de tous les groupes" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };
  
  


            
module.exports = {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  getUser
};
