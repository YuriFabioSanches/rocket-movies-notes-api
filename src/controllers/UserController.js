const AppError = require("../utils/AppError");

class UserController {
  async create(request, response) {
    return response.json({código: 'ok'})
  }
};

module.exports = UserController;