const express = require('express');
const router = express.Router();

// const { validate } = require('../validators');
// const { createCartCheckRules } = require('../validators/cart/cart-check-rules');

// // middlewares

// controller
const { registerWithEmailAndPassword } = require('../controllers/auth');

// @desc      register a user
// @route     POST /api/auth/email
// @access    Private
router.post('/auth/email', registerWithEmailAndPassword);

module.exports = router;
