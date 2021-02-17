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
    check('itinerary').not().isEmpty().withMessage('itenerary is required')
  ];
})();
