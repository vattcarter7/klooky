const express = require('express');
const router = express.Router();

const { validate } = require('../validators');
const {
  createProductLocaleCheckRules,
  editProductLocaleCheckRules
} = require('../validators/product-locale/product-locale-check-rules');

// middlewares

// controller
const {
  createProductLocale,
  editProductLocale
} = require('../controllers/product-locale');

// @desc      make a product locale
// @route     POST /api/product-locale
// @access    Private
router.post(
  '/product-locale',
  [createProductLocaleCheckRules, validate],
  createProductLocale
);

// @desc      edit a product
// @route     PUT /api/product-locale/:id
// @access    Private
router.put(
  '/product-locale/:id',
  [editProductLocaleCheckRules, validate],
  editProductLocale
);

module.exports = router;
