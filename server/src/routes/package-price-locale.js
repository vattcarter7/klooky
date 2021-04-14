const express = require('express');
const router = express.Router();

const { validate } = require('../validators');
// const {
//   createPackageDetailLocaleCheckRules,
//   editPackageDetailLocaleCheckRules
// } = require('../validators/package-detail-locale/package-detail-locale-check-rules');

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
  // [createPackageDetailLocaleCheckRules, validate],
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
