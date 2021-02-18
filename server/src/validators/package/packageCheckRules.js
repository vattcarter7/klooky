const { check } = require('express-validator');

exports.createPackageCheckRules = (() => {
  return [
    check('name').not().isEmpty().withMessage('name is required'),
    check('price_model.*.name')
      .not()
      .isEmpty()
      .withMessage('price model name is required'),
    check('price_model.*.price')
      .isNumeric()
      .withMessage('price must be number and is required')
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
