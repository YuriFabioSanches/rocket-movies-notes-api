const { Router } = require("express");
const routes = Router();
const usersRoutes = require("./usersRoutes");

routes.use("/users", usersRoutes);

module.exports = routes;