const { check } = require('express-validator');

exports.createProductCheckRules = (() => {
  return [check('name').not().isEmpty().withMessage('name is required')];
})();
