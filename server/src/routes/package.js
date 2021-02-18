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

// routes
// router.post('/product', authCheck, adminCheck, create);

// create a package
router.post('/packages', [createPackageCheckRules, validate], createPackage);

// create a package detail
router.post(
  '/package-detail',
  [createPackageDetailCheckRules, validate],
  createPackageDetail
);

// update a package detail
router.put(
  '/package-detail/:id',
  [editPackageDetailCheckRules, validate],
  editPackageDetail
);

module.exports = router;
