const express = require('express');
const router = express.Router();

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/social-network-keys');
const { SIGNIN_METHOD } = require('../constants/signin-method');
const { sendSocialTokenResponse } = require('../utils/auth-util');

const { validate } = require('../validators');
const {
  registerWithEmailAndPasswordCheckRules,
  loginWithEmailAndPasswordCheckRules,
  updatePasswordCheckRules,
  forgotPasswordCheckRules,
  resetPasswordCheckRules
} = require('../validators/auth/auth-check-rules');

// middleware
const { protect } = require('../middlewares/auth');

// controller
const {
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  updatePassword,
  logout,
  forgotPassword,
  resetPassword,
  findOrCreateSocialUser,
  getMe
} = require('../controllers/auth');

// passport strategies social network user obj
let user = {};
const FAILURE_REDIRECT_CLIENT_URL = 'http://localhost:3000/login/error';
const SUCCESS_REDIRECT_CLIENT_URL = 'http://localhost:3000/login/success';

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE.clientID,
      clientSecret: keys.GOOGLE.clientSecret,
      callbackURL: '/api/auth/google/redirect'
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log('Google Profile:', profile);
      user = await findOrCreateSocialUser(profile.id, SIGNIN_METHOD.GOOGLE, [
        profile.id,
        SIGNIN_METHOD.GOOGLE,
        profile.photos[0].value,
        profile.displayName
      ]);
      cb(null, user);
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.FACEBOOK.clientID,
      clientSecret: keys.FACEBOOK.clientSecret,
      callbackURL: '/api/auth/facebook/redirect',
      profileFields: ['id', 'displayName', 'photos']
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log('Facebook Profile:', profile);
      user = await findOrCreateSocialUser(profile.id, SIGNIN_METHOD.FACEBOOK, [
        profile.id,
        SIGNIN_METHOD.FACEBOOK,
        profile.photos[0].value,
        profile.displayName
      ]);
      cb(null, user);
    }
  )
);

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

// @desc      check a user via google
// @route     POST /api/auth/google
// @access    Public
router.get(
  '/auth/google',
  passport.authenticate(SIGNIN_METHOD.GOOGLE, {
    scope: ['profile', 'email']
  })
);

// @desc      Redirect a user via google
// @route     POST /api/auth/google/redirect
// @access    Public
router.get(
  '/auth/google/redirect',
  passport.authenticate(SIGNIN_METHOD.GOOGLE, {
    session: false,
    failureMessage: 'Cannot login with google. Please try again later',
    failureRedirect: FAILURE_REDIRECT_CLIENT_URL,
    successRedirect: SUCCESS_REDIRECT_CLIENT_URL
  })
);

// @desc      check a user via facebook
// @route     POST /api/auth/facebook
// @access    Public
router.get('/auth/facebook', passport.authenticate(SIGNIN_METHOD.FACEBOOK));

// @desc      Redirect a user via facebook
// @route     POST /api/auth/facebook
// @access    Public
router.get(
  '/auth/facebook/redirect',
  passport.authenticate(SIGNIN_METHOD.FACEBOOK, { session: false }),
  async (req, res) => {
    console.log('::::: user in the redirect', req.user);
    try {
      // Here seems doesn't send the token
      sendSocialTokenResponse(req.user, res);
    } catch (err) {
      console.log(err);
      res.status(403).json({
        errMsg: 'Unable to authenticate with facebook account'
      });
    }
  }
);

// @desc      get a user profile after authenticate with a social network passportjs. and user data is received from above
// @route     POST /api/profile
// @access    Public
router.get('/auth/profile', (req, res) => {
  if (!user) return res.status(401).json({ errMsg: 'Unable to get profile' });
  sendSocialTokenResponse(user, res);
});

// @desc      get a user profile from jwt and database
// @route     POST /api/auth/user
// @access    Private
router.get('/auth/me', protect, getMe);

// @desc      Logout a user
// @route     POST /api/auth/logout
// @access    Private
router.get('/auth/logout', protect, logout);

// @desc      Update a user password
// @route     PUT /api/auth/update-password
// @access    Private
router.put(
  '/auth/update-password',
  protect,
  [updatePasswordCheckRules, validate],
  updatePassword
);

// @desc      forgot password
// @route     POST /api/auth/forgot-password
// @access    Public
router.post(
  '/auth/forgot-password',
  [forgotPasswordCheckRules, validate],
  forgotPassword
);

// @desc      reset password
// @route     PUT /api/auth/reset-password/:token
// @access    Public
router.put(
  '/auth/reset-password/:token',
  [resetPasswordCheckRules, validate],
  resetPassword
);

module.exports = router;
