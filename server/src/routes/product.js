const express = require('express');
const router = express.Router();

const { validate } = require('../validators');
// const {

// } = require('../validators/');

// middlewares

// controller
const { createProduct } = require('../controllers/product');

// @desc      make a product
// @route     POST /api/products
// @access    Private
router.post('/products', createProduct);

module.exports = router;
