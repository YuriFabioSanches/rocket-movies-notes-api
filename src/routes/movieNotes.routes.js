const { Router } = require("express");
const movieNotesRoutes = Router();

const MovieNotesController = require("../controllers/MovieNotesController");
const movieNotesController = new MovieNotesController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const ratingMiddleware = require("../middlewares/ratingMiddleware");

movieNotesRoutes.use(ensureAuthenticated)

movieNotesRoutes.get("/", movieNotesController.index);
movieNotesRoutes.get("/:id", movieNotesController.show);
movieNotesRoutes.post("/", ratingMiddleware, movieNotesController.create);
movieNotesRoutes.put("/:id", ratingMiddleware, movieNotesController.update);
movieNotesRoutes.delete("/:id", movieNotesController.delete);

module.exports = movieNotesRoutes;