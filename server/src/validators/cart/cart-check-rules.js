const { check } = require('express-validator');

exports.createCartCheckRules = (() => {
  return [
    check('product_locale_id')
      .not()
      .isEmpty()
      .withMessage('valid product locale ID is required'),

    check('package_detail_locale_id')
      .not()
      .isEmpty()
      .withMessage('valid package detail locale ID is required'),

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
