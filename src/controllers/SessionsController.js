const AppError = require("../utils/AppError")
const knex = require("../database/knex")
const { compare } = require("bcryptjs")
const { sign } = require("jsonwebtoken")
const authConfig = require("../config/auth");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    const user = await knex("users").where({ email }).first()
    
    if(!user){
      throw new AppError("Invalid email/password.", 401)
    }

    const checkPassword = await compare(password, user.password)

    if(!checkPassword){
      throw new AppError("Invalid email/password.", 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return response.status(201).json({ user, token })
  }
};

module.exports = SessionsController;