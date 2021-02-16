const { check } = require('express-validator');

exports.createPurchaseCheckRules = (() => {
  return [
    check('quantity_price_model.*.name')
      .not()
      .isEmpty()
      .withMessage('name is required'),
    check('quantity_price_model.*.price')
      .isNumeric()
      .withMessage('price must be number and is required'),
    check('quantity_price_model.*.pax')
      .isInt()
      .not()
      .isEmpty()
      .withMessage('pax is required'),
    check('total')
      .isNumeric()
      .withMessage('total price is required and must be numbers'),
    check('discount')
      .optional()
      .isNumeric()
      .withMessage('discount must be number')
  ];
})();
