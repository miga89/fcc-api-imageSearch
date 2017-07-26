exports.notFound = (req, res, next) => {
  const err = new Error('404 - Page not Found');
  err.status = 404;
  next(err);
};

/*
  Production Error Handler

  No stacktraces are leaked to user
*/
exports.productionErrors = (err, req, res, next) => {
  res.end(err.message);
};