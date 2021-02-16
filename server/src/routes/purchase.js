const express = require('express');
const router = express.Router();

const { validate } = require('../validators');
const {
  createPurchaseCheckRules
} = require('../validators/purchase/createPurchaseCheckRules');

// middlewares

// controller
const { createPurchase } = require('../controllers/purchase');

// routes
// router.post('/product', authCheck, adminCheck, create);

// @desc      make a purchase order
// @route     POST /api/purchase
// @access    Private
router.post('/purchase', [createPurchaseCheckRules, validate], createPurchase);

module.exports = router;
