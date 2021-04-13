const { check } = require('express-validator');

//-- check rules for creating a product locale
exports.createProductLocaleCheckRules = (() => {
  return [
    check('product_id').isInt().withMessage('a valid product ID is required'),

    check('language_id').isInt().withMessage('a valid language ID is required'),

    check('product_name')
      .isString()
      .withMessage('a valid product name is required'),

    check('product_overview')
      .isString()
      .withMessage('a valid product overview is required'),

    check('product_highlights')
      .not()
      .isEmpty()
      .withMessage('product highlights required')
  ];
})();

//-- check rules for editing a product locale
exports.editProductLocaleCheckRules = (() => {
  return [
    check('product_id')
      .optional()
      .isInt()
      .withMessage('a valid product ID is required'),

    check('language_id')
      .optional()
      .isInt()
      .withMessage('a valid language ID is required'),

    check('product_name')
      .optional()
      .isString()
      .withMessage('a valid product name is required'),

    check('product_overview')
      .optional()
      .isString()
      .withMessage('a valid product overview is required')
  ];
})();
