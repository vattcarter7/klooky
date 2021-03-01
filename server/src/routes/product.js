const express = require('express');
const router = express.Router();

const { validate } = require('../validators');
const {
  createProductCheckRules
} = require('../validators/product/productCheckRules');

// middlewares

// controller
const { createProduct, editProduct } = require('../controllers/product');

// @desc      make a product
// @route     POST /api/products
// @access    Private
router.post('/products', [createProductCheckRules, validate], createProduct);

// @desc      edit a product
// @route     PUT /api/products/:id
// @access    Private
router.put('/products/:id', editProduct);

module.exports = router;
