const { check } = require('express-validator');

exports.registerWithEmailAndPasswordCheckRules = (() => {
  return [
    check('login_email').isEmail().withMessage('a valid email is required'),

    check('login_password').not().isEmpty().withMessage('password is required'),

    check('fullname').isString().withMessage('a valid fullname is required'),

    check('gender').isString().withMessage('gender is required')
  ];
})();

exports.loginWithEmailAndPasswordCheckRules = (() => {
  return [
    check('login_email').isEmail().withMessage('a valid email is required'),

    check('login_password').not().isEmpty().withMessage('password is required')
  ];
})();