const express = require('express');
const router = express.Router();

const { validate } = require('../validators');
const {
  createCartCheckRules
} = require('../validators/cart/createCartCheckRules');

// middlewares

// controller
const { createCartItem } = require('../controllers/cart');

// routes
// router.post('/product', authCheck, adminCheck, create);
router.post('/cart', [createCartCheckRules, validate], createCartItem);

module.exports = router;
