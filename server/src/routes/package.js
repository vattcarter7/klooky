const express = require('express');
const router = express.Router();

// middlewares

// controller
const { createPackage } = require('../controllers/package');

// routes
// router.post('/product', authCheck, adminCheck, create);
router.post('/packages', createPackage);

module.exports = router;
