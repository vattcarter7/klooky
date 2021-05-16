const express = require('express');
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { readdirSync } = require('fs');

const errorHandler = require('./middlewares/error');

module.exports = () => {
  const app = express();
  // Development logging
  if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
  }
  // Body parser, reading data from body into req.body
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));

  app.use(cookieParser());

  app.use(cors());

  app.enable('trust proxy');

  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, 'views'));

  // Serving static files
  app.use(express.static(path.join(__dirname, 'public')));

  // Set security HTTP headers
  app.use(helmet());

  // Limit requests from same API
  const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
  });
  app.use('/api', limiter);

  // Data sanitization against XSS
  app.use(xss());

  // Prevent parameter pollution
  app.use(
    hpp({
      whitelist: [
        'duration',
        'ratingsQuantity',
        'ratingsAverage',
        'maxGroupSize',
        'difficulty',
        'price'
      ]
    })
  );

  app.use(compression());

  // routes middleware
  readdirSync('./src/routes').map((r) =>
    app.use('/api', require('./routes/' + r))
  );

  // error fallback
  app.use(errorHandler);

  return app;
};
