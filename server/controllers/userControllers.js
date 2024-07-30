const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const validator = require('validator');

// * Get All Users

const getUsers = async (req , res) =>{
    try {
        const users = await User.find({}).sort({createdAt:-1});
        res.status(200).json(users);
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: error.message });
  }
}


// * Get A Single User

const getUser = async (req , res) => {
  const { id } = req.params;

  if(!id) {
    return res.status(404).json({message : 'id Not found'})
  }

  try {
    const user = await User.findById(id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message });
  }
}

// * Create A new User
const createUser = async (req, res) => { 
  try {
    const { userName, email, password, groop } = req.body;

    if (!email || !password || !userName) {
      throw Error('All fields must be filled');
    }

    if (!validator.isEmail(email)) {
      throw Error('Email is not valid');
    }

    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough');
    }

    const existUserName = await User.findOne({ userName });

    if (existUserName) {
      throw Error('UserName already in use');
    }

    const existEmail = await User.findOne({ email });

    if (existEmail) {
      throw Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({ userName, email, password: hash, groop });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
    
    
    // * delete A User
    
    const deleteUser = async (req, res ) => {

      const { id } = req.params;

        try {
            const user = await User.findByIdAndDelete(id);
            if (user == null) {
            return res.status(404).json({ message: 'User not found' });
            }
        
        res.status(201).json({ message: 'User deleted' });
        
       } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
       }

       
    }


// * update A User

    const updateUser = async (req, res) => {
      const { id } = req.params;

        try {
            const user = await User.findById(id);

            if (user == null) {
              return res.status(404).json({ message: 'User not found' });
            }

           
        
            Object.keys(req.body).forEach(async (key) => {
              switch (key) {
                case 'uid':
                  user.uid = req.body.uid;
                  break;
                case 'userName':
                  user.userName = req.body.userName;
                  break;
                case 'email':
                  user.email = req.body.email;
                  break;
                case 'password':
                  const salt = await bcrypt.genSalt(10);
                  const hash = await bcrypt.hash(req.body.password, salt);
                  user.password = hash;
                  break;
                case 'permission':
                  user.permission = req.body.permission;
                  break;
                default:
                  break;
              }
            });
        
            await user.save();

            res.json(user);

          } catch (error) {
            res.status(400).json({ message: error.message });
          }
    }


module.exports = {
    createUser ,getUsers,deleteUser ,updateUser,getUser 
}