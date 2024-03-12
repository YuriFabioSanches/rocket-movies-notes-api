const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MovieTagsController {
  async index(request, response) {
    const { user_id } = request.params;

    const [user] = await knex("users").where({ id: user_id});
    if(!user) {
      throw new AppError("User not found.")
    };

    const movie_tags = await knex("movie_tags").where({ user_id });

    if(movie_tags.length == 0){
      return response.status(200).json({message: "None tags found for this user"});
    };

    return response.status(200).json(movie_tags);

  };
};

module.exports = MovieTagsController;