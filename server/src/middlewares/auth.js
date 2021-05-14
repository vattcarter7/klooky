const jwt = require('jsonwebtoken');
const pool = require('../pool');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;
  console.log(req.cookies.jwt);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt && req.cookies.jwt !== 'loggedout') {
    // Set token from cookie
    token = req.cookies.jwt;
  } else {
    token = null;
  }

  if (!token) {
    return res
      .status(403)
      .json({ errorMsg: 'Not authorized to access this route' });
  }

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, async (error, decoded) => {
    if (error) {
      return res.status(403).json({
        errMsg: 'Token is not valid. Not authorized to access this route'
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
            errMsg: 'Token is not valid. Not authorized to access this route'
          });
        }
        // check if a user has changed a new password by checking password_changed_at > decoded.iat
        // time format of password_changed_at should be similar like: 2021-05-12T15:40:00.562Z
        // but time format of decoded.iat shold be similar like: 1620846538
        const passwordChangedAt = rows[0].password_changed_at;

        if (passwordChangedAt) {
          // since decoded.iat is an epoch time we need to convert passwordChangedAt to epoch time as well
          const passwordChangedAtTimestamp = parseInt(
            new Date(passwordChangedAt).getTime() / 1000.0,
            10
          );

          if (passwordChangedAtTimestamp > decoded.iat) {
            return res.status(403).json({
              errMsg: 'you need to sigin in again'
            });
          }
        }

        // grant access to protected routes
        req.user = decoded;
        console.log('req.user:', req.user);
        next();
      } catch (err) {
        return res.status(403).json({
          errMsg: 'Token is not valid. Not authorized to access this route'
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
