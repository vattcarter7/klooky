const express = require('express');
const router = express.Router();

const { validate } = require('../validators');

const {
  createProductReviewCheckRules
} = require('../validators/product-review/productReviewCheckRules');

// middlewares

// controller
const { createReview } = require('../controllers/product-review');

// routes
// router.post('/product', authCheck, adminCheck, create);

// @desc      create a product review
// @route     POST /api/product-reviews
// @access    Private
router.post(
  '/product-reviews',
  [createProductReviewCheckRules, validate],
  createReview
);

module.exports = router;
