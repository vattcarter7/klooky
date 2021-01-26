const express = require('express');
const router = express.Router();

// middlewares

// controller
const { create } = require('../controllers/product');

// routes
router.post('/product', authCheck, adminCheck, create);
router.get('/products/total', productsCount);

router.get('/products/:count', listAll); // products/100

module.exports = router;
