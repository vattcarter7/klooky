const express = require('express');
const router = express.Router();

const { validate } = require('../validators');
const {
  registerWithEmailAndPasswordCheckRules,
  loginWithEmailAndPasswordCheckRules
} = require('../validators/auth/auth-check-rules');

// // middlewares

// controller
const {
  registerWithEmailAndPassword,
  loginWithEmailAndPassword
} = require('../controllers/auth');

// @desc      register a user
// @route     POST /api/auth/email/register
// @access    Private
router.post(
  '/auth/email/register',
  [registerWithEmailAndPasswordCheckRules, validate],
  registerWithEmailAndPassword
);

// @desc      login a user
// @route     POST /api/auth/email/login
// @access    Private
router.post(
  '/auth/email/login',
  [loginWithEmailAndPasswordCheckRules, validate],
  loginWithEmailAndPassword
);

module.exports = router;
