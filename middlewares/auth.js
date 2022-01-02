const { JWT_SALT } = process.env;
const jwt = require('jsonwebtoken');

// allows us to pass a db into the function, function within a function syntax
const tokenAuth = () => async (req, res, next) => {
  try {
    const authToken = req.header('Authorization').replace('Bearer ', '');
    console.log('auth Token:', authToken);

    const verifyToken = jwt.verify(authToken, JWT_SALT);
    console.log('Verified Token', verifyToken);
    next();
  } catch (err) {
    return res.status(403).json({ err });
  }
};

module.exports = tokenAuth;
