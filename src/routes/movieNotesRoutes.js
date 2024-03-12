const { Router } = require("express");
const movieNotesRoutes = Router();
const MovieNotesController = require("../controllers/MovieNotesController");
const movieNotesController = new MovieNotesController();

movieNotesRoutes.post("/:user_id", movieNotesController.create);

module.exports = movieNotesRoutes;