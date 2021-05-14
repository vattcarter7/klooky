const crypto = require('crypto');

const pool = require('../pool');
const { toPgTimestamp } = require('../utils/time-util');
const { hashPassword, comparePassword } = require('../utils/auth-util');
const Email = require('./../utils/email');
const { sendEmailTokenResponse } = require('../utils/auth-util');
const { SIGNIN_METHOD } = require('../constants/signin-method');

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
                          fullname,
                          gender
                        ) VALUES($1, $2, $3, $4, $5) returning *`;
    const registerUserValues = [
      req.body.login_email.trim().toLowerCase(),
      hashedPassword,
      SIGNIN_METHOD.EMAIL,
      req.body.fullname.trim().toLowerCase(),
      req.body.gender
    ];

    const { rows } = await pool.query(registerUserQuery, registerUserValues);
    if (!rows[0]) {
      return res.status(400).json({ errorMsg: 'unable to register a user' });
    }

    const user = rows[0];
    sendEmailTokenResponse(user, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      errorMsg: 'unable to register a user'
    });
  }
};

exports.loginWithEmailAndPassword = async (req, res) => {
  try {
    const query = 'SELECT * FROM users WHERE login_email = $1';
    const { rows } = await pool.query(query, [
      req.body.login_email.trim().toLowerCase()
    ]);
    if (!rows[0]) {
      return res.status(400).json({
        errorMsg: 'Invalid credentials'
      });
    }
    if (
      !(await comparePassword(req.body.login_password, rows[0].login_password))
    ) {
      return res.status(400).json({
        errorMsg: 'Invalid credentials'
      });
    }

    const user = rows[0];
    sendEmailTokenResponse(user, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      errorMsg: 'unable to log in'
    });
  }
};

exports.findOrCreateSocialUser = async (
  socialNetworkUserId,
  signinMethod,
  userFieldValues
) => {
  //**  check if user already exists in the database
  const query = `SELECT * FROM users WHERE social_network_user_id=$1 AND signin_method=$2`;
  const params = [socialNetworkUserId, signinMethod];
  try {
    const { rows } = await pool.query(query, params);
    //**  check if the user not exist, add the new user to the database
    if (!rows[0]) {
      const insertUserQuery = `
      INSERT INTO users (social_network_user_id, signin_method, avatar, fullname) 
      VALUES ($1, $2, $3, $4) RETURNING *;                       
    `;
      const newUserResponse = await pool.query(
        insertUserQuery,
        userFieldValues
      );
      if (!newUserResponse.rows[0]) {
        throw new Error('unable to register');
      }
      console.log('New User', newUserResponse.rows[0]);
      return newUserResponse.rows[0];
    } else {
      //** if there is already a user in the database
      console.log('Old User', rows[0]);
      return rows[0];
    }
  } catch (err) {
    throw new Error(`unable to authenticate with ${signinMethod} account`);
  }
};

exports.logout = async (req, res, next) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 3 * 1000), // expires in 3 seconds
    httpOnly: true
  });

  res.status(200).json({
    user: {}
  });
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM users WHERE id=$1 AND banned=$2 AND signin_method=$3;`,
      [req.user.userId, false, SIGNIN_METHOD.EMAIL]
    );

    // check if there is the user
    if (!rows[0])
      return res
        .status(404)
        .json({ errorMsg: 'No user found to update password' });

    // check if the posted current password is correct
    if (
      !(await comparePassword(
        req.body.current_password,
        rows[0].login_password
      ))
    ) {
      return res.status(400).json({
        errorMsg: 'Your current password is wrong'
      });
    }

    // hash password before inserting into database
    const newHashedPassword = await hashPassword(req.body.new_password);

    const NOW = Date.now();

    // if the password is correct update the password
    const response = await pool.query(
      `UPDATE users SET 
          login_password = $1, 
          password_changed_at = to_timestamp($2), 
          updated_at = to_timestamp($3)
       WHERE id = $4 RETURNING *;
      `,
      [
        newHashedPassword,
        toPgTimestamp(NOW),
        toPgTimestamp(NOW),
        req.user.userId
      ]
    );

    const user = response.rows[0];
    sendEmailTokenResponse(user, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      errorMsg: 'unable to update password'
    });
  }
};

exports.forgotPassword = async (req, res, next) => {
  //  Get user based on POSTed email
  try {
    const userQuery = `SELECT * FROM users WHERE login_email = $1 AND banned = $2;`;
    const values = [req.body.login_email, false];
    const userResponse = await pool.query(userQuery, values);

    if (!userResponse.rows[0]) {
      return res.status(404).json({
        err: err.message,
        errorMsg: 'No user found'
      });
    }

    //  Generate the random reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    const passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    //  save passwordResetToken and passwordResetExpires in the database
    const updateUserTokenQuery = `UPDATE users SET 
                                    password_reset_token      = $1,
                                    password_reset_expires    = to_timestamp($2),
                                    updated_at                = to_timestamp($3)
                                  WHERE login_email = $4 RETURNING *;`;
    const updateUserTokenValues = [
      passwordResetToken,
      toPgTimestamp(passwordResetExpires),
      toPgTimestamp(Date.now()),
      userResponse.rows[0].login_email
    ];

    await pool.query(updateUserTokenQuery, updateUserTokenValues);

    //  Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/auth/reset-password/${resetToken}`;

    const user = userResponse.rows[0];
    await new Email(user, resetURL).sendPasswordReset();
    return res.status(200).json({
      success: true,
      msg: 'Email sent'
    });
  } catch (err) {
    //  save passwordResetToken=null and passwordResetExpires=null in the database
    await pool.query(
      `UPDATE users SET 
        password_reset_token = $1, 
        password_reset_expires = $2
      WHERE login_email = $3`,
      [null, null, req.body.login_email]
    );
    return res.status(400).json({
      err: err.message,
      errMsg: 'unable to send email to change password'
    });
  }
};
