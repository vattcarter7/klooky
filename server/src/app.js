const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { readdirSync } = require('fs');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const keys = require('./config/social-network-keys');
const { SIGNIN_METHOD } = require('./constants/signin-method');
const { sendSocialTokenResponse } = require('./utils/auth-util');
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
  //       console.log('Facebook Profile:', profile);
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
        console.log('Google Profile:', profile);
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
    passport.authenticate(SIGNIN_METHOD.GOOGLE, {
      scope: ['profile', 'email']
    })
  );

  app.get(
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

  app.get('/profile', (req, res) => {
    res.send(user);
  });

  // routes middleware
  readdirSync('./src/routes').map((r) =>
    app.use('/api', require('./routes/' + r))
  );

  return app;
};
