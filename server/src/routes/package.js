const express = require('express');
const router = express.Router();

// middlewares

// controller
const {
  createPackage,
  createPackageDetail,
  editPackageDetail
} = require('../controllers/package');

// routes
// router.post('/product', authCheck, adminCheck, create);
router.post('/packages', createPackage);
router.post('/package-detail', createPackageDetail);
router.put('/package-detail/:id', editPackageDetail);

module.exports = router;
