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
    check('min_age')
      .optional()
      .isInt()
      .withMessage('a valid minimum age is required'),
    check('max_age')
      .optional()
      .isInt()
      .withMessage('a valid maximum age is required'),
    check('min_pax')
      .optional()
      .isInt()
      .withMessage('a valid minimum pax is required'),
    check('max_pax')
      .optional()
      .isInt()
      .withMessage('a valid maximum pax is required'),
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
      .withMessage('a valid package price is required'),
    check('min_age')
      .optional()
      .isInt()
      .withMessage('a valid minimum age is required'),
    check('max_age')
      .optional()
      .isInt()
      .withMessage('a valid maximum age is required'),
    check('min_pax')
      .optional()
      .isInt()
      .withMessage('a valid minimum pax is required'),
    check('max_pax')
      .optional()
      .isInt()
      .withMessage('a valid maximum pax is required')
  ];
})();
