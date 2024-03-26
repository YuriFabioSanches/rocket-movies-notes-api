const AppError = require("../utils/AppError")
const authConfig = require("../config/auth")
const { verify } = require("jsonwebtoken")

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization

  if(!authHeader) {
    throw new AppError("JWT token not provided.", 401)
  }
  
  const [, token] = authHeader.split(" ")
  const { secret } = authConfig.jwt

  try{
    const { sub: user_id } = verify(token, secret)

    request.user = {
      id: Number(user_id)
    }

  }catch{
    throw new AppError("JWT token invalid.", 401)
  }
  
  next()
}

module.exports = ensureAuthenticated;