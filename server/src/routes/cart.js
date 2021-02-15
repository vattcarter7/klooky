const express = require('express');
const router = express.Router();

const { validate } = require('../validators');
const { rules: createCartRules } = require('../validators/cart/create');

// middlewares

// controller
const { createCartItem } = require('../controllers/cart');

// routes
// router.post('/product', authCheck, adminCheck, create);
router.post('/cart', [createCartRules, validate], createCartItem);

module.exports = router;
