const { check } = require('express-validator');

//-- check rules for creating a product
exports.createProductCheckRules = (() => {
  return [
    check('product_duration')
      .isInt()
      .withMessage('product duration is integer and required'),

    check('product_location.*.lat')
      .optional()
      .isInt()
      .withMessage('latitude must be integer number'),

    check('product_location.*.lng')
      .optional()
      .isInt()
      .withMessage('longitude must be integer number'),

    check('product_free_cancelation_max_day')
      .optional()
      .isInt()
      .withMessage('product cancellation max day must be integer number'),

    check('product_validity_period')
      .optional()
      .isInt()
      .withMessage('product validity period must be integer number'),

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
      .withMessage('is_hotel_pickup must be boolean'),

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

//-- check rules for editting a product
exports.editProductCheckRules = (() => {
  return [
    check('product_duration')
      .optional()
      .isInt()
      .withMessage('product duration is integer and required'),

    check('product_location.*.lat')
      .optional()
      .isInt()
      .withMessage('latitude must be integer number'),

    check('product_location.*.lng')
      .optional()
      .isInt()
      .withMessage('longitude must be integer number'),

    check('product_free_cancelation_max_day')
      .optional()
      .isInt()
      .withMessage('product cancellation max day must be integer number'),

    check('product_validity_period')
      .optional()
      .isInt()
      .withMessage('product validity period must be integer number'),

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
