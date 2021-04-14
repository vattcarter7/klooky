const express = require('express');
const router = express.Router();

const { validate } = require('../validators');
const {
  createPackagePriceLocaleCheckRules
} = require('../validators/package-price-locale/package-price-locale-check-rules');

// middlewares

// controller
const {
  createPackagePriceLocale
} = require('../controllers/package-price-locale');

// @desc      make a package price locale
// @route     POST /api/package-price-locale
// @access    Private
router.post(
  '/package-price-locale',
  [createPackagePriceLocaleCheckRules, validate],
  createPackagePriceLocale
);

// @desc      edit a package detail locale
// @route     PUT /api/package-detail-locale/:id
// @access    Private
// router.put(
//   '/package-detail-locale/:id',
//   [editPackageDetailLocaleCheckRules, validate],
//   editPackageDetailLocale
// );

module.exports = router;
