const { check } = require('express-validator');

exports.createProductCheckRules = (() => {
  return [
    check('product_duration')
      .not()
      .isEmpty()
      .withMessage('product duration is required'),

    check('product_location.*.lat')
      .isInt()
      .withMessage('latitude must be integer number'),

    check('product_location.*.lng')
      .isInt()
      .withMessage('longitude must be integer number'),

    check('product_free_cancelation_max_day')
      .optional()
      .isInt()
      .withMessage('product cancellation max day must be integer number'),

    check('published')
      .optional()
      .isBoolean()
      .withMessage('published must be boolean'),

    check('is_pickup')
      .optional()
      .isBoolean()
      .withMessage('is_pickup must be boolean'),

    check('is_fixed_date_ticket')
      .optional()
      .isBoolean()
      .withMessage('is_fixed_date_ticket must be boolean'),

    check('is_location_meetup')
      .optional()
      .isBoolean()
      .withMessage('is_location_meetup must be boolean'),

    check('is_joined_and_private_available')
      .optional()
      .isBoolean()
      .withMessage('is_joined_and_private_available must be boolean'),

    check('is_hotel_pickup')
      .optional()
      .isBoolean()
      .withMessage('is_hotel_pickup must be boolean')
  ];
})();
