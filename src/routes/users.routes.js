const { Router } = require("express");
const usersRoutes = Router();

const UserController = require("../controllers/UserController");
const userController = new UserController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

usersRoutes.post("/", userController.create);
usersRoutes.get("/", ensureAuthenticated, userController.show);
usersRoutes.put("/", ensureAuthenticated, userController.update);
usersRoutes.delete("/", ensureAuthenticated, userController.delete);

module.exports = usersRoutes;