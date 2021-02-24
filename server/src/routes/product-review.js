const express = require('express');
const router = express.Router();

const { validate } = require('../validators');

const {
  createProductReviewCheckRules
} = require('../validators/product-review/productReviewCheckRules');

// middlewares

// controller
const { createReview, editReview } = require('../controllers/product-review');

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

// @desc      update a product review
// @route     PUT /api/product-reviews
// @access    Private
router.put('/product-reviews/:id', editReview);

module.exports = router;
