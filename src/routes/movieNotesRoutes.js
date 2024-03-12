const { Router } = require("express");
const movieNotesRoutes = Router();
const MovieNotesController = require("../controllers/MovieNotesController");
const movieNotesController = new MovieNotesController();


module.exports = movieNotesRoutes;