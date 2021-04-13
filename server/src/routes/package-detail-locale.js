const express = require('express');
const router = express.Router();

const { validate } = require('../validators');
const {
  createPackageDetailLocaleCheckRules
} = require('../validators/package-detail-locale/package-detail-locale-check-rules');

// middlewares

// controller
const {
  createPackageDetailLocale,
  editPackageDetailLocale
} = require('../controllers/package-detail-locale');

// @desc      make a package detail locale
// @route     POST /api/package-detail-locale
// @access    Private
router.post(
  '/package-detail-locale',
  [createPackageDetailLocaleCheckRules, validate],
  createPackageDetailLocale
);

// @desc      edit a package detail locale
// @route     PUT /api/package-detail-locale/:id
// @access    Private
router.put('/package-detail-locale/:id', editPackageDetailLocale);

module.exports = router;
