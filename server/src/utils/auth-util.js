const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.hashPassword = async (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

exports.comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

const generateSignedJwtToken = (id, signin_method) => {
  const token = jwt.sign(
    {
      userId: id,
      signin_method
    },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: process.env.JWT_EXPIRE }
  );
  return token;
};

const ONE_DAY = 24 * 60 * 60 * 1000;

const cookieOptions = {
  expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * ONE_DAY),
  httpOnly: true
};

if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

exports.sendEmailTokenResponse = (user, res) => {
  const token = generateSignedJwtToken(user.id, user.signin_method);
  user.password = undefined;
  user.password_reset_token = undefined;
  user.password_reset_expires = undefined;

  return res.cookie('jwt', token, cookieOptions).json({
    token,
    user
  });
};

exports.sendSocialTokenResponse = (user, res) => {
  const token = generateSignedJwtToken(user.id, user.signin_method);
  res.cookie('jwt', token, cookieOptions);
  res.redirect('/api/profile');
};

exports.generateSignedJwtToken = generateSignedJwtToken;
