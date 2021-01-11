const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { readdirSync } = require('fs');

module.exports = () => {
  const app = express();

  // middlewares
  app.use(morgan('dev'));
  app.use(bodyParser.json({ limit: '2mb' }));
  app.use(cors());

  // routes middleware
  readdirSync('./src/routes').map((r) =>
    app.use('/api', require('./routes/' + r))
  );

  return app;
};
