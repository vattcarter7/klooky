const express = require('express');
const router = express.Router();

const { validate } = require('../validators');

// const {

// } = require('../validators/purchase/purchaseCheckRules');

// middlewares

// controller
const { createReview } = require('../controllers/product-review');

// routes
// router.post('/product', authCheck, adminCheck, create);

// @desc      create a product review
// @route     POST /api/product-reviews
// @access    Private
router.post('/product-reviews', createReview);

module.exports = router;
