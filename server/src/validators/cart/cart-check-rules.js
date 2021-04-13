const { check } = require('express-validator');

exports.createCartCheckRules = (() => {
  return [
    check('quantity_price_model.*.name')
      .not()
      .isEmpty()
      .withMessage('name is required'),
    check('quantity_price_model.*.price')
      .isNumeric()
      .not()
      .isEmpty()
      .withMessage('price is required'),
    check('quantity_price_model.*.pax')
      .isInt()
      .not()
      .isEmpty()
      .withMessage('pax is required')
  ];
})();
