const { JWT_SALT } = process.env;
const jwt = require('jsonwebtoken');

// allows us to pass a db into the function, function within a function syntax
const tokenAuth = () => async (req, res, next) => {
  // req.headers.authorization = 'Bearer sdfsdfsdgsdgdsfgds'
  const authToken = req.header('Authorization').replace('Bearer', '');
  const verifyToken = jwt.verify(authToken, JWT_SALT);
  if (verifyToken) {
    console.log('Verified Token', verifyToken);
    next();
  } else {
    return res.status(403).json({ err: 'invalid token' });
  }
};

module.exports = tokenAuth;
