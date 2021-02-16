const { check } = require('express-validator');

exports.createPackageCheckRules = (() => {
  return [
    check('name').not().isEmpty().withMessage('name is required'),
    check('price_model.*.name')
      .not()
      .isEmpty()
      .withMessage('price model name is required'),
    check('price_model.*.price')
      .isNumeric()
      .withMessage('price must be number and is required')
  ];
})();
