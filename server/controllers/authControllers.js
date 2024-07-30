const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const loginUser = async (req, res) => {
    const {email, password} = req.body
  
    try {
      const user = await User.login(email, password)
  
      // create a token
      const token = createToken(user._id)
  
       // Set the token in a cookie
       res.cookie('token', token, { 
        httpOnly: true, 
        maxAge: 24 * 60 * 60 * 1000 ,
        secure: true,
      });


      res.status(200).json({email, token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
  
  module.exports = { loginUser }
  // ? Haker so3odi 
  // eyJhbGciOiJlUzl1NllslnR5cCl6lkpXVCJ9.eyJpZCl6ljElLCJpYXQlOjE3MjE4MDg4NzEslmV4cCl6MTcyMjY5NTl3MX0.j9v9pqe1pJVCfpzw8YB2qquKySOg6cdjQYCycyPd12Q

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
