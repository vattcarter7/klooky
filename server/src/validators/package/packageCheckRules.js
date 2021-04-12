const { check } = require('express-validator');

exports.createPackageCheckRules = (() => {
  return [
    check('language_id').not().isEmpty().withMessage('language ID is required'),
    check('published')
      .optional()
      .isBoolean()
      .withMessage('published value must be a boolean'),
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

exports.createPackageDetailCheckRules = (() => {
  //TODO add other fields later
  return [
    check('includes').not().isEmpty().withMessage('inclusive is required'),
    check('excludes').not().isEmpty().withMessage('exclusive is required'),
    check('itinerary').not().isEmpty().withMessage('itenerary is required'),
    check('package_duration')
      .isNumeric()
      .withMessage('package duration must be number and is required'),
    check('free_cancelation_max_day')
      .optional()
      .isInt()
      .withMessage('free cancelation max day must be integer number')
  ];
})();

exports.editPackageDetailCheckRules = (() => {
  //TODO add packageId and check for the empty packageId
  return [
    check('includes').not().isEmpty().withMessage('inclusive is required'),
    check('package_duration')
      .optional()
      .isNumeric()
      .withMessage('package duration must be number'),
    check('free_cancelation_max_day')
      .optional()
      .isInt()
      .withMessage('free cancelation max day must be integer number')
  ];
})();
