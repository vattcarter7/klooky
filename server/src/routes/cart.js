const express = require('express');
const router = express.Router();

const { validate } = require('../validators');
const { createCartCheckRules } = require('../validators/cart/cart-check-rules');

// middlewares

// controller
const { createCartItem } = require('../controllers/cart');

// @desc      make a cart
// @route     POST /api/cart
// @access    Private
router.post('/cart', [createCartCheckRules, validate], createCartItem);

module.exports = router;
