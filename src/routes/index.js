const { Router, static } = require("express");
const routes = Router();

const usersRoutes = require("./users.routes");
const movieNotesRoutes = require("./movieNotes.routes");
const movieTagsRoutes = require("./movieTags.routes");
const sessionsRoutes = require("./sessions.routes");

const { UPLOAD_FOLDER } = require("../config/upload")

routes.use("/file", static(UPLOAD_FOLDER))
routes.use("/users", usersRoutes);
routes.use("/movienotes", movieNotesRoutes);
routes.use("/movietags", movieTagsRoutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;