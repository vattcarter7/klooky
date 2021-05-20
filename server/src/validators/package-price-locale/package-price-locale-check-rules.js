const { check } = require('express-validator');

exports.createPackagePriceLocaleCheckRules = (() => {
  return [
    check('package_detail_locale_id')
      .not()
      .isEmpty()
      .withMessage('package detail local ID is required'),
    check('package_price_name')
      .isString()
      .withMessage('a valid package price name is required'),
    check('price').isNumeric().withMessage('a valid package price is required')
  ];
})();

exports.editPackagePriceLocaleCheckRules = (() => {
  return [
    check('package_price_name')
      .optional()
      .isString()
      .withMessage('a valid package price name is required'),
    check('price')
      .optional()
      .isNumeric()
      .withMessage('a valid package price is required')
  ];
})();
