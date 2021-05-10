const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(err);

  // If there are custom errors, code check for errors here
  if (err.name === 'some_error_name') {
    error.message = 'custom error message here';
  }

  res.status(error.statusCode || 500).json({
    errMsg: error.message || 'Server Error'
  });
};

module.exports = errorHandler;
