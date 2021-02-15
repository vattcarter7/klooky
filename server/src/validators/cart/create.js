const { check } = require('express-validator');

exports.rules = (() => {
  return [
    check('quantity_price_model.*.name')
      .require()
      .withMessage('name is required'),
    check('quantity_price_model.*.price')
      .isNumeric()
      .require('price is required'),
    check('quantity_price_model.*.pax').isInt().require('pax is required')
  ];
})();
