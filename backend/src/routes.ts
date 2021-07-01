import { Router } from "express";
import { UserController } from "./controllers/UserController";
import isAuthenticated from "./middlewares/isAuthenticated";

const router = Router();

const userController = new UserController();

router.get("/users", userController.list);
router.post("/users/create", isAuthenticated, userController.create);

router.post("/login", userController.authenticate);

export { router };