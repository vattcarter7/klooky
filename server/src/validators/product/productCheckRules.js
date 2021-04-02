const { check } = require('express-validator');

exports.createProductCheckRules = (() => {
  return [
    check('product_duration')
      .not()
      .isEmpty()
      .withMessage('product duration is required'),
    check('product_location.*.lat')
      .optional()
      .isInt()
      .withMessage('latitude must be integer number'),
    check('product_location.*.lng')
      .optional()
      .isInt()
      .withMessage('longitude must be integer number')
  ];
})();
