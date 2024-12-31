const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
  groop: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Groop' }],
  active: { type: Boolean , default: true},
  admin: { type: Boolean , default: false},
}, { timestamps: true });



userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};


const User = mongoose.model('User', userSchema);

module.exports = User;

// userSchema.statics.signup = async function (userName, email, password) {
//   if (!email || !password || !userName) {
//     throw Error('All fields must be filled');
//   }

//   if (!validator.isEmail(email)) {
//     throw Error('Email is not valid');
//   }

//   if (!validator.isStrongPassword(password)) {
//     throw Error('Password not strong enough');
//   }

//   const existUserName = await this.findOne({ userName });

//   if (existUserName) {
//     throw Error('UserName already in use');
//   }

//   const existEmail = await this.findOne({ email });

//   if (existEmail) {
//     throw Error('Email already in use');
//   }

//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);

//   const user = await this.create({
//     userName,
//     email,
//     password: hash,
//     permission: {
//       Read: { documents: new Map() },
//       Download: { documents: new Map() },
//     },
//   });

//   return user;
// };