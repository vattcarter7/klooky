const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { readdirSync } = require('fs');

const app = express();

module.exports = () => {
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cors());

  // routes middleware
  readdirSync('./src/routes').map((r) =>
    app.use('/api', require('./routes/' + r))
  );

  return app;
};
