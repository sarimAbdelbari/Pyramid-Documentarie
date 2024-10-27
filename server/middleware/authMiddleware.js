const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies

  if (!token) {
    return res.status(401).json({ authenticated: false, message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ authenticated: false, message: 'Failed to authenticate token' });
    }

    req.userId = decoded._id; // Set the userId in the request object

    next();
  });
};

module.exports = { verifyToken };
