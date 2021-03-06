const { check } = require('express-validator');

exports.createProductReviewCheckRules = (() => {
  return [
    check('rating')
      .isInt()
      .withMessage('rating must be integer and is required'),
    check('comment').isString().withMessage('comment is required'),
    check('photos').optional().isArray()
  ];
})();
