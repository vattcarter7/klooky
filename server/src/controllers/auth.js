const { promisify } = require('util');

const pool = require('../pool');
const { toPgTimestamp } = require('../utils/time-util');
const { hashPassword, comparePassword } = require('../utils/auth-util');

const { sendTokenResponse } = require('../utils/auth-util');

exports.registerWithEmailAndPassword = async (req, res) => {
  try {
    const textQuery = `SELECT * FROM users WHERE login_email = $1`;
    const value = [req.body.login_email.toLowerCase().trim()];

    const response = await pool.query(textQuery, value);

    // if the user with the provided email already existed
    if (response.rows[0]) {
      return res
        .status(403)
        .json({ errorMsg: 'email already exists. Try using another one' });
    }

    // hash password before inserting into database
    const hashedPassword = await hashPassword(req.body.login_password);

    const registerUserQuery = `INSERT INTO users(
                          login_email, 
                          login_password,
                          signin_method,
                          firstname,
                          lastname,
                          gender
                        ) VALUES($1, $2, $3, $4, $5, $6) returning *`;
    const registerUserValues = [
      req.body.login_email.trim().toLowerCase(),
      hashedPassword,
      'email',
      req.body.firstname.trim().toLowerCase(),
      req.body.lastname.trim().toLowerCase(),
      req.body.gender
    ];

    const { rows } = await pool.query(registerUserQuery, registerUserValues);
    if (!rows[0]) {
      return res.status(400).json({ errorMsg: 'unable to register a user' });
    }

    const user = rows[0];

    sendTokenResponse(user, 201, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      errorMsg: 'unable to register a user'
    });
  }
};
