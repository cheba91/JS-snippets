class AppError extends Error {
   constructor(message, statusCode) {
      super(message);

      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;

      Error.captureStackTrace(this, this.constructor);
   }
}
module.exports = AppError;
// Common use: return new AppError('Not found', 404)
// return next(new AppError('Please provide email and password.', 400));
