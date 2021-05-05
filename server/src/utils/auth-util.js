const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.hashPassword = async (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(process.env.SALT));
};

exports.comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

exports.generateSignedJwtToken = (id, signin_method) => {
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
