const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { hash } = require("bcryptjs");

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body;

    if(!name) {
      throw new AppError("Please inform a name to register your account.");
    }else if(!email){
      throw new AppError("Please inform a e-mail to register your account.");
    }else if(!password){
      throw new AppError("Please inform a password to register your account.");
    };

    const [checkEmailInUse] = await knex("users").where({ email });
    if(checkEmailInUse) {
      throw new AppError("E-mail already registered.");
    };

    const hashPassword = await hash(password, 8);

    await knex("users").insert({ name, email, password:hashPassword });

    return response.status(201).json({message: "User created"});
  }
};

module.exports = UserController;