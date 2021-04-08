const express = require('express');
const router = express.Router();

const { validate } = require('../validators');
// const {
//   createProductCheckRules,
//   editProductCheckRules
// } = require('../validators/');

// middlewares

// controller
const {
  createProductLocale,
  editProductLocale
} = require('../controllers/product-locale');

// @desc      make a product locale
// @route     POST /api/product-locale
// @access    Private
router.post('/product-locale', createProductLocale);

// @desc      edit a product
// @route     PUT /api/product-locale/:id
// @access    Private
router.put('/product-locale/:id', editProductLocale);

module.exports = router;
