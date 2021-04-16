const { check } = require('express-validator');

exports.createCartCheckRules = (() => {
  return [
    check('package_id')
      .not()
      .isEmpty()
      .withMessage('valid package ID is required'),

    check('user_id').not().isEmpty().withMessage('valid user ID is required'),

    check('quantity_price_model.*.name')
      .isString()
      .withMessage('valid name is required'),

    check('quantity_price_model.*.price')
      .isNumeric()
      .withMessage('valid price is required'),

    check('quantity_price_model.*.pax')
      .isInt()
      .withMessage('valid pax number is required')
  ];
})();
