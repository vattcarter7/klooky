const express = require('express');
const router = express.Router();

// middlewares

// controller
const { createPurchase } = require('../controllers/purchase');

// routes
// router.post('/product', authCheck, adminCheck, create);

// @desc      make a purchase order
// @route     POST /api/purchase
// @access    Private
router.post('/purchase', createPurchase);

module.exports = router;
