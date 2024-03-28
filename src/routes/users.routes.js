const { Router } = require("express");
const usersRoutes = Router();

const UserController = require("../controllers/UserController");
const userController = new UserController();

const UserAvatarController = require("../controllers/UserAvatarController");
const userAvatarController = new UserAvatarController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const multer = require("multer")
const { MULTER } = require("../config/upload")
const upload = multer(MULTER)

usersRoutes.post("/", userController.create);
usersRoutes.get("/", ensureAuthenticated, userController.show);
usersRoutes.put("/", ensureAuthenticated, userController.update);
usersRoutes.post("/delete", ensureAuthenticated, userController.delete);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar") ,userAvatarController.update);

module.exports = usersRoutes;