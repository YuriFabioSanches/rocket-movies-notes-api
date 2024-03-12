class AppError {
  message;
  statusCode;

  constructor(message, statusCode = 400) {
    this.message,
    this.statusCode = statusCode
  };
};

module.exports = AppError;