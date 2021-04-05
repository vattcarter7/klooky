const express = require('express');
const router = express.Router();

const { validate } = require('../validators');
// const {
//   createProductCheckRules,
//   editProductCheckRules
// } = require('../validators/');

// middlewares

// controller
const { createProductLocale } = require('../controllers/product-locale');

// @desc      make a product locale
// @route     POST /api/product-locale
// @access    Private
router.post('/product-locale', createProductLocale);

// @desc      edit a product
// @route     PUT /api/products/:id
// @access    Private
// router.put('/products/:id', [editProductCheckRules, validate], editProduct);

module.exports = router;
