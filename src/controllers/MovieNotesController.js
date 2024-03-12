const knex = require("../database/knex");
const AppError = require("../utils/AppError");
class MovieNotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const { user_id } = request.params;

    const [checkUserExist] = await knex("users").where("id", user_id);
    if(!checkUserExist){
      throw new AppError("User not found.")
    };

    if(rating < 1 || rating > 5){
      throw new AppError("Rating need to be bettwen 1 and 5.")
    };

    const [note_id] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id
    });

    if(!tags){
      return response.status(201).json({message: "Movie note created"});
    }
    
    const tagsInsert = tags.map(tag => {
      return {
        note_id,
        name: tag,
        user_id
      }
    });

    await knex("movie_tags").insert(tagsInsert);

    return response.status(201).json({message: "Movie note created"});
  };
};

module.exports = MovieNotesController;