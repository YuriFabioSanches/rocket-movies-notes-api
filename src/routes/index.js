const { Router } = require("express");
const routes = Router();

const usersRoutes = require("./usersRoutes");
const movieNotesRoutes = require("./movieNotesRoutes");
const movieTagsRoutes = require("./movieTagsRoutes");

routes.use("/users", usersRoutes);
routes.use("/movienotes", movieNotesRoutes);
routes.use("/movietags", movieTagsRoutes);

module.exports = routes;