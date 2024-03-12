const knex = require("../database/knex");
const AppError = require("../utils/AppError");
class MovieNotesController {
  async show(request, response) {
    const { id } = request.params;

    const movie_note = await knex("movie_notes").where({ id }).first();

    if(!movie_note){
      throw new AppError("Note don't exist.");
    };

    const movie_note_tags = await knex("movie_tags").where({ note_id: id });

    return response.status(200).json({
      ...movie_note,
      movie_note_tags
    });
  };

  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const { user_id } = request.params;

    const [checkUserExist] = await knex("users").where("id", user_id);
    if(!checkUserExist){
      throw new AppError("User not found.")
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

  async update(request, response) {
    const { title, description, rating } = request.body;
    const { id } = request.params;

    const [note] = await knex("movie_notes").where({ id });
    if(!note) {
      throw new AppError("Note don't exist.");
    };

    note.title = title ?? note.title;
    note.description = description ?? note.description;
    note.rating = rating ?? note.rating;
    note.updated_at = knex.fn.now();

    await knex("movie_notes").update(note).where({ id });

    return response.status(200).json({message: "Note Updated"})
  };

  async delete(request, response) {
    const { id } = request.params

    const [noteExist] = await knex("movie_notes").where({ id })
    if(!noteExist){
      throw new AppError("Movie note does not exist.")
    }

    await knex("movie_notes").where({ id }).delete()

    return response.status(200).json({message: "Movie note deleted"})
  };
};

module.exports = MovieNotesController;