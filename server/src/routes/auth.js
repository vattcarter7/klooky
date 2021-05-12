const express = require('express');
const router = express.Router();

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/social-network-keys');
const { SIGNIN_METHOD } = require('../constants/signin-method');
const { sendSocialTokenResponse } = require('../utils/auth-util');
const { findOrCreateSocialUser } = require('../controllers/auth');

const { validate } = require('../validators');
const {
  registerWithEmailAndPasswordCheckRules,
  loginWithEmailAndPasswordCheckRules,
  updatePasswordCheckRules
} = require('../validators/auth/auth-check-rules');

// middleware
const { protect } = require('../middlewares/auth');

// controller
const {
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  updatePassword,
  logout
} = require('../controllers/auth');

// passport strategies social network user obj
let user = {};

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

router.get(
  '/auth/google',
  passport.authenticate(SIGNIN_METHOD.GOOGLE, {
    scope: ['profile', 'email']
  })
);

router.get(
  '/auth/google/redirect',
  passport.authenticate(SIGNIN_METHOD.GOOGLE, { session: false }),
  async (req, res) => {
    console.log('::::: user in the redirect', req.user);
    try {
      sendSocialTokenResponse(req.user, res);
    } catch (err) {
      console.log(err);
      res.status(403).json({
        errMsg: 'Unable to authenticate with google account'
      });
    }
  }
);

router.get('/auth/facebook', passport.authenticate(SIGNIN_METHOD.FACEBOOK));

router.get(
  '/auth/facebook/redirect',
  passport.authenticate(SIGNIN_METHOD.FACEBOOK, { session: false }),
  async (req, res) => {
    console.log('::::: user in the redirect', req.user);
    try {
      sendSocialTokenResponse(req.user, res);
    } catch (err) {
      console.log(err);
      res.status(403).json({
        errMsg: 'Unable to authenticate with facebook account'
      });
    }
  }
);

router.get('/profile', (req, res) => {
  res.send(user);
});

router.get('/auth/logout', logout);

router.post(
  '/auth/update-password',
  protect,
  [updatePasswordCheckRules, validate],
  updatePassword
);

module.exports = router;
