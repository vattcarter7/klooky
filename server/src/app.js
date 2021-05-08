const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { readdirSync } = require('fs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const keys = require('./config/social-network-keys');
const { SIGNIN_METHOD } = require('./constants/signin-method');
const pool = require('./pool');
const {
  sendTokenResponse,
  generateSignedJwtToken
} = require('./utils/auth-util');
const { findOrCreateSocialUser } = require('./controllers/auth');

module.exports = () => {
  // middlewares
  app.use(passport.initialize());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cors());

  let user = {};
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((user, cb) => {
    cb(null, user);
  });

  // // Facebook Strategy
  // passport.use(
  //   new FacebookStrategy(
  //     {
  //       clientID: keys.FACEBOOK.clientID,
  //       clientSecret: keys.FACEBOOK.clientSecret,
  //       callbackURL: '/auth/facebook/redirect'
  //     },
  //     (accessToken, refreshToken, profile, cb) => {
  //       console.log(JSON.stringify(profile));
  //       user = { ...profile };
  //       return cb(null, profile);
  //     }
  //   )
  // );

  // Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.GOOGLE.clientID,
        clientSecret: keys.GOOGLE.clientSecret,
        callbackURL: '/auth/google/redirect'
      },
      async (accessToken, refreshToken, profile, cb) => {
        console.log('Profile:', profile);
        user = await findOrCreateSocialUser(profile.id, SIGNIN_METHOD.GOOGLE, [
          profile.id,
          SIGNIN_METHOD.GOOGLE
        ]);
        cb(null, user);
      }
    )
  );

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  app.get(
    '/auth/google/redirect',
    passport.authenticate('google', { session: false }),
    async (req, res) => {
      console.log('::::: user in the redirect', req.user);
      try {
        const token = generateSignedJwtToken(
          req.user.id,
          req.user.signin_method
        );
        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
          ),
          httpOnly: true
        };
        if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
        res.cookie('jwt', token, cookieOptions);
        // sendTokenResponse(req.user, 200, res);
        res.redirect('/profile');
      } catch (err) {
        console.log(err);
        res.status(403).json({
          errMsg: 'Unable to authenticate with google account'
        });
      }
    }
  );

  app.get('/profile', (req, res) => {
    res.send(user);
  });

  // routes middleware
  readdirSync('./src/routes').map((r) =>
    app.use('/api', require('./routes/' + r))
  );

  return app;
};
