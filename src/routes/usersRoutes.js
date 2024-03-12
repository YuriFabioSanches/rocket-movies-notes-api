const { Router } = require("express");
const usersRoutes = Router();
const UserController = require("../controllers/UserController");

const userController = new UserController();

usersRoutes.get("/:id", userController.show);
usersRoutes.post("/", userController.create);
usersRoutes.put("/:id", userController.update);

module.exports = usersRoutes;