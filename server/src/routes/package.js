const express = require('express');
const router = express.Router();

const { validate } = require('../validators');
const {
  createPackageCheckRules
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
router.post('/packages', [createPackageCheckRules, validate], createPackage);
router.post('/package-detail', createPackageDetail);
router.put('/package-detail/:id', editPackageDetail);

module.exports = router;
