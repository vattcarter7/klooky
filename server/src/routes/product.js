const express = require('express');
const router = express.Router();

const { validate } = require('../validators');
const {
  createProductCheckRules
} = require('../validators/product/productCheckRules');

// middlewares

// controller
const { createProduct } = require('../controllers/product');

// @desc      make a product
// @route     POST /api/products
// @access    Private
router.post('/products', [createProductCheckRules, validate], createProduct);

module.exports = router;
