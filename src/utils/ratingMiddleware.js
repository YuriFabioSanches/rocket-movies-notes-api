const AppError = require("./AppError")

function ratingMiddleware(request, response, next) {
  const { rating } = request.body;

  if(rating < 1 || rating > 5){
    throw new AppError("Rating need to be bettwen 1 and 5.")
  };

  next()
};

module.exports = ratingMiddleware;