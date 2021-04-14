const express = require('express');
const router = express.Router();

const { validate } = require('../validators');
const {
  createPackagePriceLocaleCheckRules,
  editPackagePriceLocaleCheckRules
} = require('../validators/package-price-locale/package-price-locale-check-rules');

// middlewares

// controller
const {
  createPackagePriceLocale,
  editPackagePriceLocale
} = require('../controllers/package-price-locale');

// @desc      make a package price locale
// @route     POST /api/package-price-locale
// @access    Private
router.post(
  '/package-price-locale',
  [createPackagePriceLocaleCheckRules, validate],
  createPackagePriceLocale
);

// @desc      edit a package price locale
// @route     PUT /api/package-price-locale/:id
// @access    Private
router.put(
  '/package-price-locale/:id',
  [editPackagePriceLocaleCheckRules, validate],
  editPackagePriceLocale
);

module.exports = router;
