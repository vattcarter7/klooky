const express = require('express');
const router = express.Router();

const { validate } = require('../validators');
const {
  createPackageCheckRules,
  createPackageDetailCheckRules,
  editPackageDetailCheckRules
} = require('../validators/package/packageCheckRules');

// middlewares

// controller
const {
  createPackage,
  createPackageDetail,
  editPackageDetail
} = require('../controllers/package');

// @desc      make a package
// @route     POST /api/packages
// @access    Private
router.post('/packages', [createPackageCheckRules, validate], createPackage);

// @desc      make a package detail
// @route     POST /api/package-detail
// @access    Private
router.post(
  '/package-detail',
  [createPackageDetailCheckRules, validate],
  createPackageDetail
);

// @desc      update a package detail
// @route     POST /api/package-detail/:id
// @access    Private
router.put(
  '/package-detail/:id',
  [editPackageDetailCheckRules, validate],
  editPackageDetail
);

module.exports = router;
