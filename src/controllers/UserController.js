const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { hash, compare } = require("bcryptjs");

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
  };

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const [user] = await knex("users").where({ id });

    if(!user){
      throw new AppError("User not found.");
    };

    if(email) {
      const [userWithEmailInUse] = await knex("users").where({ email });
  
      if(userWithEmailInUse && userWithEmailInUse.id != user.id) {
        throw new AppError("E-mail already registered.");
      };
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(!password && old_password){
      throw new AppError("Please inform a new password.");
    }else if(password && !old_password){
      throw new AppError("Please inform your old password.");
    };

    if(password && old_password){
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword){
        throw new AppError("Your old password is wrong.");
      }

      const newHashPassword = await hash(password, 8);
      user.password = newHashPassword;
    };

    user.updated_at = knex.fn.now();

    await knex("users").update(user).where({ id });

    return response.status(200).json({message: "User updated"});
  };
};

module.exports = UserController;