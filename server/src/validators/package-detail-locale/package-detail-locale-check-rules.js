const { check } = require('express-validator');

exports.createPackageDetailLocaleCheckRules = (() => {
  return [
    check('package_id').not().isEmpty().withMessage('package ID is required'),
    check('language_id').not().isEmpty().withMessage('language ID is required'),
    check('package_name')
      .isString()
      .withMessage('a valid package name is required'),
    check('package_includes')
      .not()
      .isEmpty()
      .withMessage('inclusive is required'),
    check('package_excludes')
      .not()
      .isEmpty()
      .withMessage('exclusive is required'),
    check('package_itinerary')
      .not()
      .isEmpty()
      .withMessage('itenerary is required')
  ];
})();
