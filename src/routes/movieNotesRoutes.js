const ratingMiddleware = require("../utils/ratingMiddleware")
const { Router } = require("express");
const movieNotesRoutes = Router();
const MovieNotesController = require("../controllers/MovieNotesController");
const movieNotesController = new MovieNotesController();

movieNotesRoutes.get("/", movieNotesController.index)
movieNotesRoutes.get("/:id", movieNotesController.show)
movieNotesRoutes.post("/:user_id", ratingMiddleware, movieNotesController.create);
movieNotesRoutes.put("/:id", ratingMiddleware, movieNotesController.update);
movieNotesRoutes.delete("/:id", movieNotesController.delete)

module.exports = movieNotesRoutes;