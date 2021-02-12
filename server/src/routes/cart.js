const express = require('express');
const router = express.Router();

// middlewares

// controller
const { createCartItem } = require('../controllers/cart');

// routes
// router.post('/product', authCheck, adminCheck, create);
router.post('/cart', createCartItem);

module.exports = router;
