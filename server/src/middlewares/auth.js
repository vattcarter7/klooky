const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const pool = require('../pool');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;
  // console.log(req.cookies.jwt);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res
      .status(403)
      .json({ errorMsg: 'Not authorized to access this route' });
  }

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, async (error, decoded) => {
    if (error) {
      return res.status(403).json({
        msg: 'Token is not valid. Not authorized to access this route'
      });
    } else {
      try {
        // check if the user is still in use
        const { rows } = await pool.query(
          'select * from users where id = $1 and banned = $2',
          [decoded.userId, false]
        );
        if (!rows[0]) {
          return res.status(403).json({
            msg: 'Token is not valid. Not authorized to access this route ^^^'
          });
        }
        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = decoded;
        console.log('req.user:', req.user);
        next();
      } catch (err) {
        return res.status(403).json({
          msg: 'Token is not valid. Not authorized to access this route !!!'
        });
      }
    }
  });
};

// Grand access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.user_role)) {
      return res.status(403).json({
        errorMsg: `User role ${req.user.user_role} is not authorized to this route`
      });
    }
    next();
  };
};
