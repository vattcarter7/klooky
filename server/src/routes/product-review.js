const express = require('express');
const router = express.Router();

const { validate } = require('../validators');

const {
  createProductReviewCheckRules
} = require('../validators/product-review/product-review-check-rules');

// middlewares

// controller
const {
  createReview,
  editReview,
  deleteReview
} = require('../controllers/product-review');

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
// @route     PUT /api/product-reviews/:id
// @access    Private
router.put('/product-reviews/:id', editReview);

// @desc      delte a product review
// @route     DELETE /api/product-reviews/:id
// @access    Private
router.delete('/product-reviews/:id', deleteReview);

module.exports = router;
