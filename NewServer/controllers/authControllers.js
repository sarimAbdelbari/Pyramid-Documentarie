const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const Demand = require("../models/demandModel");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    if(user=="reset password"){
        res.status(400).json('redirect to reset password')
    }
    // create a token
    const token = createToken(user._id);
    //
    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "None", // Adjust based on your deployment
    });

    res.status(200).json({ email, token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None", // Adjust based on your deployment
    });

    // console.log(res.getHeaders())

    res.status(200).json({ message: "Déconnexion réussie" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Impossible de se déconnecter" });
  }
};

const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId); // Retrieve the user using the userId set in the middleware

    if (!user) {
      return res
        .status(404)
        .json({ authenticated: false, message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ authenticated: true, user }); // Send back the user data and authentication status
  } catch (error) {
    res
      .status(500)
      .json({ authenticated: false, message: "Erreur de serveur" });
  }
};

const demandeResetPassword = async (req, res) => {
  try {
    const { userId, type, message } = req.body;
    if (!userId || userId == "") {
      res.status(404).json("user id is required");
    }
    if (!type || type == "") {
      res.status(404).json("type is required");
    }
    const user = await User.find({ _id: userId });
    if (!user || user.length == 0) {
      res.status(404).json("user not found");
    }
    const newDemand = new Demand({
      UserId: userId,
      type,
      message,
    });
    const response = await newDemand.save();
    if (!response) {
      res.status(400).json("error occured while sending your demand");
    }
    res.status(200).json(" demand sent successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
const fetchDemands= async (req, res)=>{
    try {
        const demands = await Demand.find({}).populate('UserId', 'userName email _id');
         demands.sort((a,b)=> b['createdAt']- a['createdAt']);
         res.status(200).json(demands);
    } catch (error) {
          res.status(500).json(error);
    }
}
const replyToDemand= async (req,res)=>{
    try {
      const {demandId, response}= req.body;
      const demand= await Demand.find({_id:demandId});
      if(!demand || demand.length==0){
         res.status(404).json('demand not found');
      }
      console.log(demand[0].UserId)

      const user= await User.find({_id:demand[0].UserId});
      if(!user || user.length==0){
        res.status(404).json('no user found');
      }
      const updatedUser= await User.updateOne({_id:demand[0].UserId},{$set:{reset:response}});
      if(!updatedUser){
        res.status(400).json('error occured while changing the demand status');
      }
      const updatedDemand = await Demand.updateOne({_id:demandId},{$set:{seen:true}});
      if(!updatedDemand){
        res.status(400).json('error occured while changing the demand status');
      }
      res.status(200).json("demand status changed successfully");
    } catch (error) {
        res.status(500).json(error);
    }
};

const resetPassword= async (req,res)=>{
    try {
       const {userId,newPassword}= req.body;
       console.log(newPassword)
       const user= await User.findById(userId);
       if(!user){
        res.status(404).json("no user found");
       }
       if(!user.reset){
        res.status(404).json("your are not allowed to change password");
       }
       if (!validator.isStrongPassword(newPassword)) {
        throw Error("Password not strong enough");
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);
      console.log(hash)
      const updatedUser=await User.updateOne({_id:userId},  { $set: { password: hash, reset: false } });
      if(!updatedUser){
        res.status(400).json("error occured while changing your password")
      }
       res.status(200).json("password changed successfully")
    } catch (error) {
        console.log(error)
         res.status(500).json(error)
    }
}

module.exports = { loginUser, logoutUser, checkAuth, demandeResetPassword , fetchDemands , replyToDemand, resetPassword };

// * signup user

// const signupUser = async (req, res) => {
//     const { userName, email, password } = req.body;

//     try {

//         const user = await User.signup(userName, email, password);

//         const token = createToken(user._id);

//         // Set the token in a cookie
//         res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

//         res.status(200).json({ user, token });

//     } catch (error) {

//         res.status(400).json({ error: error.message });

//     }
// };
