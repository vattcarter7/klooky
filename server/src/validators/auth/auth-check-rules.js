const { check } = require('express-validator');

exports.registerWithEmailAndPasswordCheckRules = (() => {
  return [
    check('login_email').isEmail().withMessage('a valid email is required'),

    check('login_password')
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage('password is required with at least 6 characters'),

    check('fullname').isString().withMessage('a valid fullname is required')
  ];
})();

exports.loginWithEmailAndPasswordCheckRules = (() => {
  return [
    check('login_email').isEmail().withMessage('a valid email is required'),

    check('login_password').not().isEmpty().withMessage('password is required')
  ];
})();

exports.updatePasswordCheckRules = (() => {
  return [
    check('current_password')
      .not()
      .isEmpty()
      .withMessage('current password is required'),

    check('new_password')
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage('new password is required with at least 6 characters')
  ];
})();

exports.forgotPasswordCheckRules = (() => {
  return [
    check('login_email')
      .isEmail()
      .withMessage('please provide a valid email address')
  ];
})();

exports.resetPasswordCheckRules = (() => {
  return [
    check('new_password')
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage('new password is required with at least 6 characters')
  ];
})();
