const { check } = require('express-validator');

exports.createPackagePriceLocaleCheckRules = (() => {
  return [
    check('package_id').not().isEmpty().withMessage('package ID is required'),
    check('language_id').not().isEmpty().withMessage('language ID is required'),
    check('price_model.name')
      .isString()
      .withMessage('a valid package price name is required'),
    check('price_model.price')
      .isNumeric()
      .withMessage('a valid package price is required')
  ];
})();
