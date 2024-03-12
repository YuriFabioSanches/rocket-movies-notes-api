const { Router } = require("express");
const routes = Router();

const usersRoutes = require("./usersRoutes");
const movieNotesRoutes = require("./movieNotesRoutes");

routes.use("/users", usersRoutes);
routes.use("/movienotes", movieNotesRoutes);

module.exports = routes;