const { Router } = require("express");
const routes = Router();

const usersRoutes = require("./users.routes");
const movieNotesRoutes = require("./movieNotes.routes");
const movieTagsRoutes = require("./movieTags.routes");
const sessionsRoutes = require("./sessions.routes");

routes.use("/users", usersRoutes);
routes.use("/movienotes", movieNotesRoutes);
routes.use("/movietags", movieTagsRoutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;