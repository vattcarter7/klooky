const express = require('express');
const router = express.Router();

// middlewares

// controller
const { createCartItem } = require('../controllers/cartItem');

// routes
// router.post('/product', authCheck, adminCheck, create);
router.post('/packages', createPackage);

module.exports = router;
