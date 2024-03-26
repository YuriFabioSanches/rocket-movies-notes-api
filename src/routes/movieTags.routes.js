const { Router } = require("express");
const movieTagsRoutes = Router();

const MovieTagsController = require("../controllers/MovieTagsController");
const movieTagsController = new MovieTagsController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

movieTagsRoutes.get("/", ensureAuthenticated, movieTagsController.index);

module.exports = movieTagsRoutes;