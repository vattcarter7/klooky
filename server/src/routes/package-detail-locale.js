const express = require('express');
const router = express.Router();

const { validate } = require('../validators');
// const {
//   createPackageCheckRules,
//   editPackageCheckRules,
//   createPackageDetailCheckRules,
//   editPackageDetailCheckRules
// } = require('../validators/package/packageCheckRules');

// middlewares

// controller
const {
  createPackageDetailLocale
} = require('../controllers/package-detail-locale');

// @desc      make a package detail locale
// @route     POST /api/package-detail-locale
// @access    Private
router.post('/package-detail-locale', createPackageDetailLocale);

// @desc      edit a package detail locale
// @route     PUT /api/package-detail-locale/:id
// @access    Private
// router.put('/package-detail-locale/:id', [editPackageCheckRules, validate], editPackage);

module.exports = router;
