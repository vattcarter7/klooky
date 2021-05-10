const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const pool = require('../pool');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt && req.cookies.jwt !== 'loggedout') {
    // Set token from cookie
    token = req.cookies.jwt;
  }

  if (!token) {
    return res
      .status(403)
      .json({ errorMsg: 'Not authorized to access this route' });
  }

  try {
    // verify token
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_PRIVATE_KEY
    );
    const queryText = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await pool.query(queryText, [decoded.userId]);
    if (!rows[0]) {
      return res
        .status(403)
        .json({ errorMsg: 'Not authorized to access this route' });
    }

    // GRAND ACCESS TO PROTECTED ROUTE
    req.user = {
      id: decoded.userId,
      fullname: rows[0].fullname,
      user_role: rows[0].user_role,
      signin_method: rows[0].signin_method
    };
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ errorMsg: 'Not authorized to access this route' });
  }
};

// Grand access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.user_role)) {
      return res
        .status(403)
        .json({
          errorMsg: `User role ${req.user.user_role} is not authorized to this route`
        });
    }
    next();
  };
};
